"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
var path = require("path");
var WebpackConfig_1 = require("config/WebpackConfig");
/**
 * webpack dll配置
 * cmd：webpack --config webpack.dll.config.js -p
 */
var webpackDllConfig = {
    entry: {
        vendor: WebpackConfig_1.DLL_LIBS
    },
    output: {
        path: path.resolve("./dll"),
        filename: "dll.js",
        library: "[name]_[hash]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve("./dll", "manifest.json"),
            name: "[name]_[hash]",
            context: __dirname
        })
    ]
};
exports.default = webpackDllConfig;
