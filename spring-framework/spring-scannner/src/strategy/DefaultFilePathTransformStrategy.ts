import {FilePathTransformStrategy} from "./FilePathTransformStrategy";
import {ScannerOptions} from "../index";
import * as path from "path";

export default class DefaultFilePathTransformStrategy implements FilePathTransformStrategy {


    transform = (scannerOptions: ScannerOptions) => {

        const {nodeModules, scanPackages, projectBasePath, scanBasePath} = scannerOptions;


        const modules = nodeModules.map((modelName) => {

            return path.resolve(projectBasePath, "./node_modules", modelName, "./src");
        });

        //加入项目要扫描的路径
        modules.unshift(scanBasePath ? scanBasePath : path.resolve(projectBasePath, "./src"));

        return scanPackages.map((dir) => {

            return modules.map((parentDir) => {

                return path.resolve(parentDir, dir);
            })
        }).flatMap((items) => [...items]);


    };


}