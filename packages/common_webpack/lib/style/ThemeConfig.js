"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var ResourcesPath_1 = require("../constant/ResourcesPath");
var fs_1 = require("fs");
/**
 * 获取主题配置
 * @param themeFilePath    文件路径
 * @param isPackage  是否配置在package.json文件中
 */
function getThemeConfig(themeFilePath, isPackage) {
    if (themeFilePath === void 0) { themeFilePath = path.resolve(ResourcesPath_1.DEFAULT_THEME_PATH); }
    if (isPackage === void 0) { isPackage = false; }
    var theme = {};
    if (isPackage) {
        //配置在package.json文件中
        var pkg = fs_1.existsSync(themeFilePath) ? require(themeFilePath) : {};
        if (pkg.theme && typeof (pkg.theme) === 'string') {
            var cfgPath = pkg.theme;
            // relative themeFilePath
            if (cfgPath.charAt(0) === '.') {
                cfgPath = path.resolve(global['args'].cwd, cfgPath);
            }
            theme = require(cfgPath);
        }
        else if (pkg.theme && typeof (pkg.theme) === 'object') {
            theme = pkg.theme;
        }
    }
    else {
        //使用单独的js 或 json 文件
        theme = fs_1.existsSync(themeFilePath) ? require(themeFilePath) : {};
    }
    return theme;
}
exports.getThemeConfig = getThemeConfig;
