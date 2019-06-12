import * as path from "path";
import {LoaderConfig} from "awesome-typescript-loader/dist/interfaces";
import {isExclude} from "../hepler/WebpackLoaderHelper";
import {getBabel7Configuration} from "../babel/GetBabelConfiguration";

//导入tsconfig配置文件
const tsConfig = require(path.resolve("./tsconfig.json"));

//tsconfig.json中配置target:es5
//支持es6打包
const options: LoaderConfig = tsConfig.compilerOptions.target === "es6" ? {
    useBabel: false,
    useCache: true
} : {
    useBabel: true,
    useCache: true,
    babelOptions: {
        babelrc: true
    },
    babelCore: "@babel/core"
};

export const awesomeTypescriptLoader = {
    test: /\.ts[x]?$/,
    exclude: isExclude,
    use: [
        {

            loader: "awesome-typescript-loader",
            options
        }
    ]
};


// const babel7Configuration = getBabel7Configuration();
//
// const pluginImportOptions = {
//     style: true,
//     libraryName: "antd-mobile"
// };
//
//
// babel7Configuration.plugins.push([
//     require.resolve('babel-plugin-import'),
//     pluginImportOptions,
// ]);
//
// export const awesomeTypescriptAndBabelLoader = {
//     test: /\.ts[x]?$/,
//     exclude: isExclude,
//     use: [
//         {
//             loader: "babel-loader",
//             options: babel7Configuration
//         },
//         {
//
//             loader: "awesome-typescript-loader",
//             options: {
//                 useCache: true
//             }
//         }
//     ]
// };


