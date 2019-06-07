import {FilePathTransformStrategy} from "./FilePathTransformStrategy";
import {ScannerOptions} from "../index";
import * as path from "path";

export default class DefaultFilePathTransformStrategy implements FilePathTransformStrategy {


    transform = (scannerOptions: ScannerOptions ) => {

        const {nodeModules, scanBasePackages} = scannerOptions;


        //获取项目的跟目录
        const projectBasePath = path.resolve(__dirname, "../../../");

        console.log("project base path", projectBasePath);

        const modules = nodeModules.map((modelName) => {

            return path.resolve(projectBasePath, "./node_modules", modelName, "./src");
        });

        //加入项目要扫描的路径
        modules.unshift(path.resolve("projectBasePath", "./src"));

        return scanBasePackages.map((dir) => {

            return modules.map((parentDir) => {

                return path.resolve(parentDir, dir);
            })
        }).flatMap((items) => [...items]);


    };


}