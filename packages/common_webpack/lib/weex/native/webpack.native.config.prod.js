"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
var webpack_native_config_1 = require("./webpack.native.config");
var UglifyJsPluginConfig_1 = require("../../plugins/UglifyJsPluginConfig");
var SideEffectsFlagPlugin = require("webpack/lib/optimize/SideEffectsFlagPlugin");
var FlagDependencyUsagePlugin = require("webpack/lib/FlagDependencyUsagePlugin");
var FlagDependencyExportsPlugin = require("webpack/lib/FlagDependencyExportsPlugin");
//模拟 config.mode = "production"
//https://webpack.docschina.org/concepts/mode/#mode-production
webpack_native_config_1.default.plugins.unshift(UglifyJsPluginConfig_1.uglifyJsPlugin, new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }), new webpack.optimize.OccurrenceOrderPlugin(true), 
// new webpack.optimize.UglifyJsPlugin({
//     // 最紧凑的输出
//     beautify: false,
//     // 删除所有的注释
//     comments: false,
//     sourceMap:false,
//     parallel:{
//         cache:false,
//         workers:3
//     }
// }),
// new webpack.NoEmitOnErrorsPlugin(),
// new webpack.optimize.ModuleConcatenationPlugin(),
// new SideEffectsFlagPlugin(),
new FlagDependencyUsagePlugin(), new FlagDependencyExportsPlugin());
webpack_native_config_1.default.optimization = {
    sideEffects: true,
    minimize: true,
    concatenateModules: true,
    noEmitOnErrors: true
};
// config.optimization.noEmitOnErrors=true;
// config.mode = "production";
exports.default = webpack_native_config_1.default;
