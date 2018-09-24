"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_base_config_1 = require("./webpack.base.config");
var UglifyJsPluginConfig_1 = require("../../plugins/UglifyJsPluginConfig");
webpack_base_config_1.default.plugins.push(UglifyJsPluginConfig_1.uglifyJsPlugin);
webpack_base_config_1.default.mode = "production";
exports.default = webpack_base_config_1.default;
