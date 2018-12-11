"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var postcssPluginWeex = require('postcss-plugin-weex');
var autoprefixer = require('autoprefixer');
var postcssPluginPx2Rem = require('postcss-plugin-px2rem');
exports.default = {
    // https://webpack.js.org/guides/migrating/#complex-options
    ident: 'postcss',
    plugins: function () { return [
        postcssPluginWeex(),
        //使用.browserslistrc的统一配置
        autoprefixer(),
        postcssPluginPx2Rem({ rootValue: 75, minPixelValue: 1.01 })
    ]; }
};
