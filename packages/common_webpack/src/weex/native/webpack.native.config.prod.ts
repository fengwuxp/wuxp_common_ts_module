import * as webpack from "webpack";
import config from "./webpack.native.config";
import {uglifyJsPlugin} from "../../plugins/UglifyJsPluginConfig";


// const SideEffectsFlagPlugin = require("webpack/lib/optimize/SideEffectsFlagPlugin");
// const FlagDependencyUsagePlugin = require("webpack/lib/FlagDependencyUsagePlugin");
// const FlagDependencyExportsPlugin = require("webpack/lib/FlagDependencyExportsPlugin");



config.plugins.unshift(
    uglifyJsPlugin
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
config.mode = "production";

export default config;
