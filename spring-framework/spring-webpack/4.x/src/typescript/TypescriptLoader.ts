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


