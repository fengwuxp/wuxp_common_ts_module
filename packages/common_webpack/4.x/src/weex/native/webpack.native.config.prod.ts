import * as webpack from "webpack";
import config from "./webpack.native.config";
import {uglifyJsPlugin} from "../../plugins/UglifyJsPluginConfig";
import CompressionWebpackPlugin from "compression-webpack-plugin";

// const SideEffectsFlagPlugin = require("webpack/lib/optimize/SideEffectsFlagPlugin");
// const FlagDependencyUsagePlugin = require("webpack/lib/FlagDependencyUsagePlugin");
// const FlagDependencyExportsPlugin = require("webpack/lib/FlagDependencyExportsPlugin");


config.plugins.unshift(
    uglifyJsPlugin,
    //gzip 压缩
    // new CompressionWebpackPlugin({
    //     filename: '[path].gz[query]',
    //     algorithm: 'gzip',
    //     //压缩 js 与 css
    //     test: new RegExp(
    //         '\\.(js|css)$'
    //     ),
    //     threshold: 10240,
    //     minRatio: 0.8
    // })
    // new webpack.DefinePlugin({"process.env.NODE_ENV": JSON.stringify("production")}),
    // new webpack.optimize.OccurrenceOrderPlugin(true),
    // new FlagDependencyUsagePlugin(),
    // new FlagDependencyExportsPlugin(),

);
//模拟 config.mode = "production"
//https://webpack.docschina.org/concepts/mode/#mode-production
// config.optimization = {
//     removeAvailableModules:true,
//     removeEmptyChunks:true,
//     splitChunks:{
//         chunks:"initial",
//         minSize:30000,
//         maxAsyncRequests:5,
//         maxInitialRequests:3
//     },
//     sideEffects: true,
//     // minimize: true,
//     mergeDuplicateChunks:true,
//     flagIncludedChunks:true,
//     occurrenceOrder:true,
//     concatenateModules: true,
//     noEmitOnErrors: true,
//     usedExports:true
// };
config.mode = "none";

export default config;
