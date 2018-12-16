"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs_1 = require("fs");
var themeJSONFilePath = path.resolve("./theme/index.json");
/**
 * 默认的样式主题变量文件
 * 支持js文件和json文件
 */
exports.DEFAULT_THEME_PATH = fs_1.existsSync(themeJSONFilePath) ? themeJSONFilePath : path.resolve("./theme/CommonHandle.js");
