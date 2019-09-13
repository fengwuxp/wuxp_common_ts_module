import * as webpack from "webpack";
import * as path from "path";
import {DLL_LIBS} from "config/WebpackConfig";

/**
 * webpack dll配置
 * cmd：webpack --config webpack.dll.config.js -p
 */
const webpackDllConfig: webpack.Configuration = {
    entry: {
        vendor: DLL_LIBS
    },
    output: {
        path: path.resolve("./dll"),
        filename: "dll.js",
        library: "[name]_[hash]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve("./dll", "manifest.json"),
            name: "[name]_[hash]",
            context: __dirname
        })
    ]
};

export default webpackDllConfig;
