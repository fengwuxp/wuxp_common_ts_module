import {CodeGenerator, CodeGeneratorOptions} from "../CodeGenerator";
import {
    File,
    ObjectExpression,
    CallExpression
} from "@babel/types";
import generator from "@babel/generator";
import {SpringReactRouteConfig} from "fengwuxp-spring-react/src/route/SpringReactRouteConfig";
import ArtTemplateCodeGenerator from "../template/ArtTemplateCodeGenerator";
import * as path from "path";
import {getReactViewDecorator} from "../../helper/AstDecoratorHelper";
import {LOGGER} from "../../helper/Log4jsHelper";
import StringUtils from "fengwuxp_common_utils/src/string/StringUtils";
import {NODE_MODULES_DIR} from "../../constant/ConstantVar";
import {outputToDir} from "../OutputToDirHelper";
import {getImportDeclaration} from "../../helper/AstImportHelper";
import {GenerateSpringReactRouteOptions} from "./GenerateSpringReactRouteOptions";
import {isAliasImport, normalizeAliasImportPath} from "../../helper/ImportAliasMatchHelper";

const artTemplateCodeGenerator = new ArtTemplateCodeGenerator();

interface ReactRouteConfigGeneratorOptions extends CodeGeneratorOptions {

    /**
     * 扫描的基础包名
     * 默认：["views"]
     */
    scanPackages: string[];
}


/**
 * 用于生成 react route 的路由信息
 */
export default class ReactRouteConfigGenerator implements CodeGenerator<void> {


    generator = (files: Record<string, File>, options: ReactRouteConfigGeneratorOptions) => {

        LOGGER.debug(`共扫描到react view ${Object.keys(files).length}`);

        const reactOptions: ReactRouteConfigGeneratorOptions = {
            outputFilename: "ReactRouteConfig",
            ...options
        };

        const routeConfigs: GenerateSpringReactRouteOptions[] = Object.keys(files).map(key => {

            return this.buildRouteConfig(files[key], key, reactOptions);
        });

        //组装父子路由

        //有父页面的路由
        const hasParentRoutes = routeConfigs.filter(config => {
            return config.parent != null;
        });

        //无父页面的路由
        const routes = routeConfigs.filter(config => {
            return config.parent == null;
        });

        const {aliasConfiguration, projectBasePath, outputPath, aliasBasePath} = reactOptions;

        hasParentRoutes.forEach((subRoute) => {
            const {component, parent} = subRoute;

            let parentImportPath = parent.importPath;
            if (subRoute.isNodeModules) {
                const _component = component.substring(0, component.lastIndexOf("/"));
                // 计算导入路径
                parentImportPath = path.resolve(__dirname, `${_component}`, parentImportPath)
                    .replace(__dirname, "");
                parentImportPath = parentImportPath.substring(1, parentImportPath.length);
            } else {
                if (isAliasImport(parent.importPath)) {
                    //转换别名的导入
                    parentImportPath = normalizeAliasImportPath(aliasBasePath, aliasConfiguration, parent.importPath);
                } else {
                    const _component = component.substring(0, component.lastIndexOf("/"));
                    // 计算导入路径
                    parentImportPath = path.resolve(aliasBasePath, _component, parentImportPath);
                }
                parentImportPath = path.relative(`${projectBasePath}${outputPath}/`, parentImportPath);
            }
            parentImportPath = this.normalizeImportPath(parentImportPath);

            const parentRoute = routes.find((route) => {

                return route.component === parentImportPath;
            });
            if (parentRoute == null) {
                LOGGER.error("路由配置未找到父页面 ", subRoute)
            } else {
                parentRoute.routes = parentRoute.routes || [];
                //强制使用严格模式
                subRoute.exact = true;
                parentRoute.routes.push(subRoute);
            }
        });


        const code = artTemplateCodeGenerator.generator("react/ReactRouterConfigCodeTemplate.art", {
            routes: this.sortByExact(routes)
        });

        outputToDir(code, reactOptions);


    };


    /**
     * build route config
     * @param file
     * @param filepath
     * @param projectBasePath
     * @param outputPath
     * @param scanPackages
     */
    private buildRouteConfig = (file: File, filepath: string, {
        projectBasePath,
        outputPath,
        scanPackages
    }: ReactRouteConfigGeneratorOptions): GenerateSpringReactRouteOptions => {
        //获取到reactView的装饰器
        const ReactViewDecorator = getReactViewDecorator(file);

        //得到参数
        const expression = ReactViewDecorator.expression as CallExpression;
        const _arguments = expression.arguments;


        //解析参数转换为路由配置到路由配置
        const springReactRouteConfig: GenerateSpringReactRouteOptions = _arguments.map((item: ObjectExpression) => {

            return item.properties.map((prop: any) => {
                const name = prop.key.name;
                const value = prop.value;
                const attr = {};
                //&& value.type === "ArrowFunctionExpression"
                if (name === "condition") {
                    attr[name] = generator(value).code;
                } else {
                    attr[name] = value.value;
                }

                if (name === "parent") {
                    //有父页面属性，获取父页面的导入语句
                    // attr[name] = generator(value).code;
                    const importDeclaration = getImportDeclaration(file, value.name);

                    //得到导入的文件路径
                    const importPath = importDeclaration.source.value;
                    //得到文件
                    attr[name] = {
                        importName: value.name,
                        importPath: importPath
                    };
                }

                return attr as GenerateSpringReactRouteOptions;
            })
        }).flatMap((items) => [...items])
            .reduce((prev, current) => {
                return {
                    ...prev,
                    ...current
                } as GenerateSpringReactRouteOptions
            }, {} as GenerateSpringReactRouteOptions);


        if (!StringUtils.hasText(springReactRouteConfig.pathname)) {
            //没有pathname 默认使用 文件名称+文件名 "/member/input" 然后全小写;
            const index = scanPackages.map((item) => {
                const itemLength = item.length + 1;
                return [
                    filepath.indexOf(`${path.sep}${item}${path.sep}`),
                    itemLength
                ];
            }).filter(([index, itemLength], i) => {
                //  return index > 0;
                return index > itemLength;
            }).map(([index, itemLength]) => {
                return index + itemLength;
            }).filter((i, index) => {
                return index === 0;
            }).reduce((prev, current) => {
                return prev + current;
            }, 0);

            springReactRouteConfig.pathname = this.normalizeImportPath(filepath.substring(index, filepath.lastIndexOf("."))).toLowerCase();
        }
        if (springReactRouteConfig.exact == null) {
            springReactRouteConfig.exact = true;
        }
        if (springReactRouteConfig.strict == null) {
            springReactRouteConfig.strict = true;
        }

        if (!springReactRouteConfig.pathname.startsWith("/")) {
            //不是斜杠开头
            springReactRouteConfig.pathname = `/${springReactRouteConfig.pathname}`;
        }


        let componentImportPath: string;

        const nodeModulesIndex = filepath.indexOf(NODE_MODULES_DIR);
        const isNodeModules = nodeModulesIndex > 0;
        springReactRouteConfig.isNodeModules = isNodeModules;
        if (isNodeModules) {
            //node中的模块
            componentImportPath = filepath.substring(nodeModulesIndex + NODE_MODULES_DIR.length + 1, filepath.length);
        } else {
            //计算相对路径
            // /test/example/views/member/input
            // const p1 = filepath.replace(projectBasePath, "");
            // componentImportPath = path.relative(`/${outputPath}/${outputFilename}.ts`, p1);
            componentImportPath = path.relative(`${projectBasePath}${outputPath}/`, filepath);
        }
        componentImportPath = this.normalizeImportPath(componentImportPath);

        //移除文件扩展名称
        let lastIndexOf = componentImportPath.lastIndexOf(".");
        if (lastIndexOf > 0) {
            componentImportPath = componentImportPath.substring(0, lastIndexOf);
        }

        springReactRouteConfig.component = componentImportPath;
        return springReactRouteConfig;
    };

    /**
     * 按照路由的严格模式排序，宽松模式排排后面
     * @param routes
     */
    private sortByExact = (routes: GenerateSpringReactRouteOptions[]) => {
        return routes.sort((item1, item2) => {
            //sub route 强制就是按照严格模式匹配
            // if (item1.routes) {
            //     item1.routes = this.sortByExact(item1.routes);
            // }

            if (item1.exact) {
                return 0
            }
            if (item2.exact) {
                return 1
            }
            return -1;
        });
    };

    /**
     * 标准化导入语句
     * @param componentImportPath
     */
    private normalizeImportPath = (componentImportPath: string) => {
        return componentImportPath.replace(/\\/g, "/");
    }
}
