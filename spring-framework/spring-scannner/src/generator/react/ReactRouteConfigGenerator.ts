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

    private routeConfigs: SpringReactRouteConfig[] = [];


    generator = (files: Record<string, File>, options: ReactRouteConfigGeneratorOptions) => {

        LOGGER.debug(`共扫描到react view ${Object.keys(files).length}`);

        const reactOptions: ReactRouteConfigGeneratorOptions = {
            outputFilename: "ReactRouteConfig",
            ...options
        };

        this.routeConfigs = Object.keys(files).map(key => {

            return this.buildRouteConfig(files[key], key, reactOptions);
        });

        const code = artTemplateCodeGenerator.generator("react/ReactRouterConfigCodeTemplate.art", {
            routes: this.routeConfigs
        });

        outputToDir(code, reactOptions);


    };


    private buildRouteConfig = (file: File, filepath: string, {
        projectBasePath,
        outputPath,
        scanPackages
    }: ReactRouteConfigGeneratorOptions) => {
        //获取到reactView的装饰器
        const ReactViewDecorator = getReactViewDecorator(file);

        //得到参数
        const expression = ReactViewDecorator.expression as CallExpression;
        const _arguments = expression.arguments;


        //解析参数转换为路由配置到路由配置
        const springReactRouteConfig: SpringReactRouteConfig = _arguments.map((item: ObjectExpression) => {

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


                return attr;
            })
        }).flatMap((items) => [...items])
            .reduce((prev, current) => {
                return {
                    ...prev,
                    ...current
                }
            }, {});

        springReactRouteConfig.path = springReactRouteConfig["pathname"];

        if (!StringUtils.hasText(springReactRouteConfig.path)) {
            //默认使用 文件名称+文件名 "/member/input";
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

            springReactRouteConfig.path = filepath.substring(index, filepath.lastIndexOf("."))
                .replace(/\\/g, "/");
        }
        if (springReactRouteConfig.exact == null) {
            springReactRouteConfig.exact = true;
        }

        if (!springReactRouteConfig.path.startsWith("/")) {
            springReactRouteConfig.path = `/${springReactRouteConfig.path}`;
        }


        let componentImportPath: string;

        const nodeModulesIndex = filepath.indexOf(NODE_MODULES_DIR);
        if (nodeModulesIndex > 0) {
            //node中的模块
            componentImportPath = filepath.substring(nodeModulesIndex + NODE_MODULES_DIR.length + 1, filepath.length);
        } else {
            //计算相对路径
            // /test/example/views/member/input
            const p1 = filepath.replace(projectBasePath, "");
            // componentImportPath = path.relative(`/${outputPath}/${outputFilename}.ts`, p1);
            componentImportPath = path.relative(`/${outputPath}/`, p1);
        }
        componentImportPath = componentImportPath.replace(/\\/g, "/");
        springReactRouteConfig.component = componentImportPath as any;
        return springReactRouteConfig;
    }
}
