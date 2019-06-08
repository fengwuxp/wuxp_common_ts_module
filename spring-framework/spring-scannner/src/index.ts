import {PackageScanner} from "./scanner/PackageScanner";
import SpringPackageScanner from "./scanner/SpringPackageScanner";
import {FilePathTransformStrategy} from "./strategy/FilePathTransformStrategy";
import DefaultFilePathTransformStrategy from "./strategy/DefaultFilePathTransformStrategy";
import {CodeGenerator} from "./generator/CodeGenerator";
import ReactRouteConfigGenerator from "./generator/react/ReactRouteConfigGenerator";
import * as path from "path";
import {LOGGER} from "./helper/Log4jsHelper";


export interface ScannerOptions {

    /**
     * 扫描的node模块
     * 默认：[]
     */
    nodeModules?: string[];

    /**
     * 扫描的基础包名
     * 默认：["views"]
     */
    scanPackages?: string[];

    /**
     * 生成的代码输出跟路径
     * 相对项目目录的 src目录
     * 默认：.spring
     */
    generateOutputPath?: string;

    //扫描的基础路径(文件全路径)
    scanBasePath?: string;

    //项目根路径
    projectBasePath?: string;
}

export const DEFAULT_SCANNER_OPTIONS: ScannerOptions = {
    scanPackages: ["views"],
    nodeModules: [],
    generateOutputPath: ".spring"
};


/**
 * 包扫码入口
 * @param options
 */
export default function (options?: ScannerOptions) {

    //计算项目根路径
    let projectBasePath = path.resolve(__dirname, "../");

    if (projectBasePath.indexOf("node_modules") > 0) {
        projectBasePath = path.resolve(projectBasePath, "../");
    }
    LOGGER.debug("project base path", projectBasePath);

    const scannerOptions = {
        ...(options || {}),
        ...DEFAULT_SCANNER_OPTIONS,
        projectBasePath
    };


    const filePathTransformStrategy: FilePathTransformStrategy = new DefaultFilePathTransformStrategy();

    const springPackageScanner: SpringPackageScanner = new SpringPackageScanner();

    const reactRouteConfigGenerator: ReactRouteConfigGenerator = new ReactRouteConfigGenerator();

    const files = springPackageScanner.scan(filePathTransformStrategy.transform(scannerOptions));

    reactRouteConfigGenerator.generator(files, {
        outputPath: scannerOptions.generateOutputPath,
        projectBasePath,
        scanPackages: scannerOptions.scanPackages
    });

}