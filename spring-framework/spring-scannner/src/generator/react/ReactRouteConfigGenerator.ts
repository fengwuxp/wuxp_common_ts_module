import {CodeGenerator} from "../CodeGenerator";
import {
    File,
    ObjectExpression,
    CallExpression
} from "@babel/types";
import generator from "@babel/generator";
import {SpringReactRouteConfig} from "typescript-spring-react/src/route/SpringReactRouteConfig";
import ArtTemplateCodeGenerator from "../template/ArtTemplateCodeGenerator";
import * as fs from "fs";
import * as path from "path";
import {getReactViewDecorator} from "../../helper/AstDecoratorHelper";
import {LOGGER} from "../../helper/Log4jsHelper";
import StringUtils from "common_utils/src/string/StringUtils";
import {NODE_MODULES_DIR} from "../../constant/ConstantVar";

const artTemplateCodeGenerator = new ArtTemplateCodeGenerator();

type ReactRouteConfigGeneratorOptions = {

    //路由配置文件的输出目录，相对与项目的src路径
    outputPath: string;

    //路由配置文件的文件名
    //默认 ReactRouteConfig
    outputFilename?: string;

    //项目根路径
    projectBasePath: string;

    /**
     * 扫描的基础包名
     * 默认：["views"]
     */
    scanPackages: string[];
};

const DEFAULT_OPTIONS: ReactRouteConfigGeneratorOptions = {
    outputFilename: "ReactRouteConfig"
} as any;

/**
 * 用于生成 react route 的路由信息
 */
export default class ReactRouteConfigGenerator implements CodeGenerator<void> {

    private routeConfigs: SpringReactRouteConfig[] = [];

    generator = (files: Record<string, File>, options: ReactRouteConfigGeneratorOptions) => {

        LOGGER.debug(`共扫描到react view ${Object.keys(files).length}`);

        const reactOptions: ReactRouteConfigGeneratorOptions = {
            ...options,
            ...DEFAULT_OPTIONS
        };

        this.routeConfigs = Object.keys(files).map(key => {

            return this.buildRouteConfig(files[key], key, reactOptions);
        });

        const code = artTemplateCodeGenerator.generator("react/ReactRouterConfigCodeTemplate.art", {
            routes: this.routeConfigs
        });

        const {projectBasePath, outputFilename, outputPath} = reactOptions;

        const fileOutputPath = `${projectBasePath}/${outputPath}/${outputFilename}.ts`;
        LOGGER.debug("fileOutputPath", fileOutputPath);
        fs.writeFileSync(fileOutputPath,
            code, {flag: "w+"});


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
