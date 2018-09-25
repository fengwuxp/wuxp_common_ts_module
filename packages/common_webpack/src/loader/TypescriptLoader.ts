import {isExclude} from "../utils/WebpackUtils";
import * as path from "path";

/**
 * awesome-typescript-loader
 * @author wxup
 * @create 2018-09-25 9:39
 **/

//导入tsconfig配置文件
const tsConfig = require(path.resolve("./tsconfig.json"));

//支持es6打包
const options = tsConfig.target === "es5" ? null : {
    useBabel: true,
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

//使用es6打包
const supportEs6BabelLoader = {
    loader: "babel-loader",
    options: {
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
    }
};

//tsconfig.json中配置target:es5
const awesomeTypescriptLoader = {
    test: /\.ts[x]?$/,
    exclude: isExclude,
    use: [
        //supportEs6BabelLoader
        {
            loader: "awesome-typescript-loader",
            options
        }
    ]
};


export default awesomeTypescriptLoader;
