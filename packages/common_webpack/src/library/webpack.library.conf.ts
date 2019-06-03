import * as webpack from "webpack";
import * as path from "path";
import babelLoader from "../loader/BabelLoader";
import awesomeTypescriptLoader from "../loader/TypescriptLoader";
import {Entry, EntryFunc} from "webpack";
import {Output} from "webpack";
import {Plugin} from "webpack";
import {uglifyJsPlugin} from "../plugins/UglifyJsPluginConfig";


interface GetLibraryTargetConfigOptions {

    entry: string | string[] | Entry | EntryFunc;

    production: boolean;

    /**
     * 输出目录 默认 lib
     */
    outputDir?: string;

    output?: Output;

    plugins?: Plugin[]
}


/**
 * 获取webpack library的打包配置
 * @param options
 */
export const getWebpackLibraryTargetConfig = function (options: GetLibraryTargetConfigOptions): webpack.Configuration {

    const packPath = path.resolve(options.outputDir || "./lib");

    return {
        mode: options.production ? "production" : "development",
        entry: options.entry,
        output: options.output || {
            filename: '[name].js',
            chunkFilename: '[name].js',
            path: packPath,
            libraryTarget: "commonjs"
        },
        resolve: {
            extensions: [".ts", ".tsx", "d.ts", ".js"],
        },
        devtool: options.production ? false : "source-map",
        module: {
            rules: [
                babelLoader,
                awesomeTypescriptLoader
            ]
        },

        plugins: [
            ...(options.plugins || []),
            uglifyJsPlugin
        ]
    }
};