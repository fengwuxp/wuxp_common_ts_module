"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebpackUtils_1 = require("../utils/WebpackUtils");
var path = require("path");
//导入tsconfig配置文件
var tsConfig = require(path.resolve("./tsconfig.json"));
//tsconfig.json中配置target:es5
//支持es6打包
var options = tsConfig.target === "es5" ? {
    useCache: true
} : {
    useBabel: true,
    useCache: true,
    babelOptions: {
        babelrc: true,
    },
    babelCore: "@babel/core"
};
var awesomeTypescriptLoader = {
    test: /\.ts[x]?$/,
    exclude: WebpackUtils_1.isExclude,
    use: [
        //supportEs6BabelLoader,
        {
            loader: "awesome-typescript-loader",
            options: options
        }
    ]
};
exports.default = awesomeTypescriptLoader;
