import {isExclude} from "../utils/WebpackUtils";
import * as path from "path";
import {LoaderConfig} from "awesome-typescript-loader/dist/interfaces";
import {genHappyPackLoaderString, getHappyPackPlugin} from "../utils/GetHappyPackPluginConfig";

/**
 * awesome-typescript-loader
 * @author wxup
 * @create 2018-09-25 9:39
 **/

//导入tsconfig配置文件
const tsConfig = require(path.resolve("./tsconfig.json"));


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
const options: LoaderConfig = tsConfig.target === "es5" ? null : {
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


const awesomeTypescriptLoaderName = "awesome-typescript-loader";

const awesomeTypescriptLoader = {
    test: /\.ts[x]?$/,
    exclude: isExclude,
    use: [
        {
            //supportEs6BabelLoader
            loader: awesomeTypescriptLoaderName,
            options
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


export default awesomeTypescriptLoader;
