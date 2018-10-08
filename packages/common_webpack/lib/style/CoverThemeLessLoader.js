"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
var CssModuleUtils_1 = require("./CssModuleUtils");
var PostCssLoader_1 = require("./PostCssLoader");
var ThemeConfig_1 = require("./ThemeConfig");
function getLessLoader(options) {
    var isPackage, theme;
    if (options == null) {
        options = {};
    }
    isPackage = options.packagePath !== undefined && options.packagePath !== null;
    theme = ThemeConfig_1.getThemeConfig(isPackage ? options.packagePath : options.themePath, isPackage);
    return {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
            fallback: "style-loader",
            use: [
                CssModuleUtils_1.cssModuleLoader,
                PostCssLoader_1.default,
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
exports.default = getLessLoader;
