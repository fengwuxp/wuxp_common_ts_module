"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebpackUtils_1 = require("../utils/WebpackUtils");
var babelrc7_1 = require("../../babel/babelrc7");
/**
 * babel-loader
 * @author wxup
 * @create 2018-09-25 9:37
 **/
var babelLoader = {
    test: /\.js[x]?$/,
    exclude: WebpackUtils_1.isExclude,
    use: [
        {
            loader: "babel-loader",
            options: babelrc7_1.default
        }
    ]
};
exports.default = babelLoader;
