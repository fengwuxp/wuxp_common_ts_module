"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require('webpack');
var config = require('./GetNativeBaseConfig.js').config;
// const {DEV_API_ADDRESS,TEST_H5_WEB_CONTEXT} = require("../../../webpack-config/WebpackConfig");
var bannerPlugin = new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true
});
if (config.plugins == null) {
    config.plugins = [];
}
config.plugins.push(bannerPlugin);
exports.default = config;
