import * as webpack from "webpack";
import * as path from "path";
import babelLoader from "../loader/BabelLoader";
import awesomeTypescriptLoader from "../loader/TypescriptLoader";
import {Entry, EntryFunc} from "webpack";


interface GetLibraryTargetConfigOptions {

    entry: string | string[] | Entry | EntryFunc;

    production: boolean;

    /**
     * 输出目录 默认 lib
     */
    outputDir?: string;
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
        output: {
            filename: '[name].js',
            chunkFilename: '[name].js',
            path: packPath,
            libraryTarget: "commonjs"
        },
        resolve: {
            extensions: [".ts", ".tsx", "d.ts", ".js"],
        },
        devtool: "source-map",
        module: {
            rules: [
                babelLoader,
                awesomeTypescriptLoader
            ]
        },

        plugins: [
        ]
    }
};