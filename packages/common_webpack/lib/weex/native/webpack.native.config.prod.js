"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_native_config_1 = require("./webpack.native.config");
var UglifyJsPluginConfig_1 = require("../../plugins/UglifyJsPluginConfig");
// const SideEffectsFlagPlugin = require("webpack/lib/optimize/SideEffectsFlagPlugin");
// const FlagDependencyUsagePlugin = require("webpack/lib/FlagDependencyUsagePlugin");
// const FlagDependencyExportsPlugin = require("webpack/lib/FlagDependencyExportsPlugin");
webpack_native_config_1.default.plugins.unshift(UglifyJsPluginConfig_1.uglifyJsPlugin
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
webpack_native_config_1.default.mode = "none";
exports.default = webpack_native_config_1.default;
