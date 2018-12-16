import * as path from "path";
import {INCLUDE_PATH} from "../config/webpackConfig";

//默认导入的模块
const DEFAULT_INCLUDE: string[] = [
    "common_",
    "oak_"
];

const list: string[] = [...DEFAULT_INCLUDE];

if (process.env._self !== "1") {
    if (INCLUDE_PATH) {
        list.push(...INCLUDE_PATH);
    }
}


/**
 * loader是否忽略该文件
 * @param path 文件路径
 * @return {boolean} true 忽略 false 不忽略
 */
export const isExclude = function (path) {

    const isWxpComponents = list.some((item) => {
        return path.indexOf(item) >= 0;
    });

    if (isWxpComponents || path.endsWith("_starter")) {
        return false;
    }
    //是否为node_modules中的模块
    return path.indexOf("node_modules") >= 0;
};

/**
 * 获取项目跟目录
 */
export function getProjectRootDir() {

    return path.resolve("./");
}
