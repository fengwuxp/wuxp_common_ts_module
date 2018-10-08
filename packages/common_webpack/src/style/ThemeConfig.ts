import * as path from "path";
import {DEFAULT_THEME_PATH} from "../constant/ResourcesPath";
import {existsSync} from "fs";

/**
 * 获取主题配置
 * @param themeFilePath    文件路径
 * @param isPackage  是否配置在package.json文件中
 */
export function getThemeConfig(themeFilePath = path.resolve(DEFAULT_THEME_PATH), isPackage = false) {

    let theme = {};
    if (isPackage) {
        //配置在package.json文件中
        const pkg = existsSync(themeFilePath) ? require(themeFilePath) : {};
        if (pkg.theme && typeof(pkg.theme) === 'string') {
            let cfgPath = pkg.theme;
            // relative themeFilePath
            if (cfgPath.charAt(0) === '.') {
                cfgPath = path.resolve(global['args'].cwd, cfgPath);
            }
            theme = require(cfgPath);
        } else if (pkg.theme && typeof(pkg.theme) === 'object') {
            theme = pkg.theme;
        }
    } else {
        //使用单独的js 或 json 文件
        theme = existsSync(themeFilePath) ? require(themeFilePath) : {};
    }
    return theme;
}
