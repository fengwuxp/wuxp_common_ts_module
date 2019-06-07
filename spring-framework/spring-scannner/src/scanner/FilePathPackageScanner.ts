import {PackageScanner} from "./PackageScanner";
import * as fs from "fs";

/**
 * 扫描文件目录得到文件内容
 */
export default class FilePathPackageScanner implements PackageScanner<string[]> {

    scan = (paths: string[]) => {

        return paths.map((path) => {

            return fs.readFileSync(path, "UTF-8");
        });
    };


}