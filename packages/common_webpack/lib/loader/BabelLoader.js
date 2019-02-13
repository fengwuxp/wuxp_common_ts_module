"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebpackUtils_1 = require("../utils/WebpackUtils");
var babel7Options = require("../../babel/babelrc7");
/**
 * babel-loader
 * @author wxup
 * @create 2018-09-25 9:37
 **/
var babelLoaderName = "babel-loader";
var babelLoader = {
    test: /\.js[x]?$/,
    exclude: WebpackUtils_1.isExclude,
    use: [
        {
            loader: babelLoaderName,
            options: babel7Options
        }
    ]
};
// export const happyPackBabelLoaderPlugin = getHappyPackPlugin(babelLoaderName, [
//     {
//         loader: babelLoaderName,
//         options: babel7Options
//     }
// ]);
exports.default = babelLoader;
