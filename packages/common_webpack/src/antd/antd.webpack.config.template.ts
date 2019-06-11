import * as path from "path";
import {getWebpackBaseConfig} from "../web/webpack.base.config";
import {isExclude} from "../utils/WebpackUtils";
import {getBabel7CommonConfig} from "../babel/GetBabelCommonConfig";


const babel7CommonConfig = getBabel7CommonConfig();

const pluginImportOptions =  {
    style: true,
    libraryName: "antd-mobile"
};


babel7CommonConfig.plugins.push([
    require.resolve('babel-plugin-import'),
    pluginImportOptions,
]);

const awesomeTypescriptLoader = {
    test: /\.ts[x]?$/,
    exclude: isExclude,
    use: [
        {
            loader: "babel-loader",
            options: babel7CommonConfig
        },
        {

            loader: "awesome-typescript-loader",
            options: {
                useCache: true
            }
        }
    ]
};
const config = getWebpackBaseConfig({
    themePath: path.resolve("theme", "index.json"),
    awesomeTypescriptLoader
});

const baseConfig = {
    ...config,
};


baseConfig.plugins = [
    ...config.plugins,
];
baseConfig.mode = "development";


export default baseConfig;
