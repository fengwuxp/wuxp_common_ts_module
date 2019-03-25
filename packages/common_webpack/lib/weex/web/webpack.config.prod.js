"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_base_config_1 = require("./webpack.base.config");
var UglifyJsPluginConfig_1 = require("../../plugins/UglifyJsPluginConfig");
var prodConfig = __assign({}, webpack_base_config_1.default);
prodConfig.plugins.push(UglifyJsPluginConfig_1.uglifyJsPlugin);
prodConfig.mode = "production";
prodConfig.devtool = false;
prodConfig.optimization = {
    splitChunks: {
        cacheGroups: {
            common: {
                chunks: 'initial',
                name: 'common',
                enforce: true,
                test: /node_modules/,
                minSize: 0,
                minChunks: 1,
                reuseExistingChunk: true // 可设置是否重用已用chunk 不再创建新的chunk
            }
        }
    },
    concatenateModules: true
};
exports.default = prodConfig;
