import {PackageScanner} from "./scanner/PackageScanner";
import SpringPackageScanner from "./scanner/SpringPackageScanner";
import {FilePathTransformStrategy} from "./strategy/FilePathTransformStrategy";
import DefaultFilePathTransformStrategy from "./strategy/DefaultFilePathTransformStrategy";
import {CodeGenerator} from "./generator/CodeGenerator";
import ReactRouteConfigGenerator from "./generator/react/ReactRouteConfigGenerator";
import * as path from "path";
import {LOGGER} from "./helper/Log4jsHelper";
import {NODE_MODULES_DIR} from "./constant/ConstantVar";
import {ScannerConfiguration} from "typescript-spring-context/src/configuration/scanner/ScannerConfiguration";


export interface ScannerOptions extends ScannerConfiguration{

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

    if (projectBasePath.indexOf(NODE_MODULES_DIR) > 0) {
        projectBasePath = path.resolve(projectBasePath, "../");
    }
    LOGGER.debug("project base path", projectBasePath);

    const scannerOptions = {
        ...DEFAULT_SCANNER_OPTIONS,
        ...(options || {}),
        projectBasePath
    };


    const filePathTransformStrategy: FilePathTransformStrategy = new DefaultFilePathTransformStrategy();

    const springPackageScanner: SpringPackageScanner = new SpringPackageScanner();

    const reactRouteConfigGenerator: ReactRouteConfigGenerator = new ReactRouteConfigGenerator();

    const paths = filePathTransformStrategy.transform(scannerOptions);
    const files = springPackageScanner.scan(paths);

    reactRouteConfigGenerator.generator(files, {
        outputPath: scannerOptions.generateOutputPath,
        projectBasePath,
        scanPackages: scannerOptions.scanPackages
    });

}