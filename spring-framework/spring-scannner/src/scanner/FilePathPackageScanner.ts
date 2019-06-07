import {PackageScanner} from "./PackageScanner";
import * as fs from "fs";
import * as pathModule from "path";

/**
 * 扫描文件目录得到文件路径
 */
export default class FilePathPackageScanner implements PackageScanner<string[]> {

    scan = (paths: string[]) => {

        return paths.map(function (path, index) {
            const dirs = fs.readdirSync(path);
            return dirs.map((fileName) => {
                const stats = fs.lstatSync(`${path}${pathModule.sep}${fileName}`);
                if (stats.isDirectory()) {
                    return `${path}${pathModule.sep}${fileName}`;
                }
                return null;
            }).filter((dir) => {
                return dir != null;
            }).map((dir) => {
                const fileNames = fs.readdirSync(dir);
                return fileNames.map((filename) => {
                    return `${dir}${pathModule.sep}${filename}`;
                });
            }).flatMap((items) => [...items]);
        }).flatMap((items) => [...items]);
    };


}