"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path = require("path");
var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
var CssModuleUtils_1 = require("./CssModuleUtils");
/**
 * 获取主题配置
 * @param path    文件路径
 * @param isPackage  是否配置在package.json文件中
 */
function getTheme(path, isPackage) {
    var theme = {};
    if (isPackage) {
        //配置在package.json文件中
        var pkg = fs_1.existsSync(path) ? require(path) : {};
        if (pkg.theme && typeof (pkg.theme) === 'string') {
            var cfgPath = pkg.theme;
            // relative path
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
        //使用单独的js 文件
        theme = require(path);
    }
    return theme;
}
function getLessLoader(options) {
    var isPackage = options.packagePath !== undefined && options.packagePath !== null;
    var theme = getTheme(isPackage ? options.packagePath : options.themePath, isPackage);
    return {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
            fallback: "style-loader",
            use: [
                CssModuleUtils_1.lessModuleLoader,
                {
                    loader: "postcss-loader",
                    options: {
                        config: {
                            path: path.join(__dirname, './PostCss.config.js')
                        },
                        ident: "css-loader"
                    }
                },
                {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true,
                        javascriptEnabled: true,
                        modifyVars: theme,
                        ident: "css-loader"
                    }
                }
            ]
        })
    };
}
exports["default"] = getLessLoader;
