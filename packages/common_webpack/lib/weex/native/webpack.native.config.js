"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
var webpack_native_base_config_1 = require("./webpack.native.base.config");
var bannerPlugin = new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true
});
if (webpack_native_base_config_1.default.plugins == null) {
    webpack_native_base_config_1.default.plugins = [];
}
webpack_native_base_config_1.default.mode = "development";
webpack_native_base_config_1.default.plugins.push(bannerPlugin);
exports.default = webpack_native_base_config_1.default;
