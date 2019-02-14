"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebpackUtils_1 = require("../utils/WebpackUtils");
var path = require("path");
/**
 * awesome-typescript-loader
 * @author wxup
 * @create 2018-09-25 9:39
 **/
//导入tsconfig配置文件
var tsConfig = require(path.resolve("./tsconfig.json"));
//使用es6打包
// const supportEs6BabelLoader = {
//     loader: "babel-loader",
//     options: {
//         presets: [
//             "@babel/preset-env"
//         ],
//         plugins: [
//             "@babel/plugin-transform-regenerator",
//             [
//                 "@babel/plugin-transform-runtime",
//                 {
//                     "helpers": false,
//                     "regenerator": true
//                 }
//             ]
//         ]
//     }
// };
//tsconfig.json中配置target:es5
//支持es6打包
var options = tsConfig.target === "es5" ? null : {
    useBabel: true,
    useCache: true,
    babelOptions: {
        babelrc: false,
        presets: [
            "@babel/preset-env"
        ],
        plugins: [
            "@babel/plugin-transform-regenerator",
            [
                "@babel/plugin-transform-runtime",
                {
                    "helpers": false,
                    "regenerator": true
                }
            ]
        ]
    },
    babelCore: "@babel/core"
};
var awesomeTypescriptLoaderName = "awesome-typescript-loader";
var awesomeTypescriptLoader = {
    test: /\.ts[x]?$/,
    exclude: WebpackUtils_1.isExclude,
    use: [
        {
            //supportEs6BabelLoader
            loader: awesomeTypescriptLoaderName,
            options: options
        }
    ]
};
// export const happyPackTypescriptLoaderPlugin = getHappyPackPlugin(awesomeTypescriptLoaderName, [
//     {
//         //supportEs6BabelLoader
//         loader: awesomeTypescriptLoaderName,
//         options
//     }
// ]);
exports.default = awesomeTypescriptLoader;
