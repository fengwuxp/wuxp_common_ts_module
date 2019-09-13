import {isExclude} from "../utils/WebpackUtils";
import * as path from "path";
import {LoaderConfig} from "awesome-typescript-loader/dist/interfaces";

//导入tsconfig配置文件
const tsConfig = require(path.resolve("./tsconfig.json"));

//tsconfig.json中配置target:es5
//支持es6打包
const options: LoaderConfig = tsConfig.compilerOptions.target === "es6" ? {
    useCache: true
} : {
    useBabel: true,
    useCache: true,
    babelOptions: {
        babelrc: true,
        // presets: [
        //     "@babel/preset-env"
        // ],
        // plugins: [
        //     "@babel/plugin-transform-regenerator",
        //     [
        //         "@babel/plugin-transform-runtime",
        //         {
        //             "helpers": false,
        //             "regenerator": true
        //         }
        //     ]
        // ]
    },
    babelCore: "@babel/core"
};

const awesomeTypescriptLoader = {
    test: /\.ts[x]?$/,
    exclude: isExclude,
    use: [
        //supportEs6BabelLoader,
        {

            loader: "awesome-typescript-loader",
            options
        }
    ]
};



export default awesomeTypescriptLoader;
