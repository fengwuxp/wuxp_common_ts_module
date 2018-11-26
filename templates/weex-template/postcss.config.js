"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var autoprefixer = require("autoprefixer").default;
exports.postCssConfig = {
    // https://webpack.js.org/guides/migrating/#complex-options
    ident: 'postcss',
    plugins: function () {
        return [
            require('postcss-flexbugs-fixes'),
            require('precss'),
            require('postcss-cssnext'),
            autoprefixer(),
        ];
    }
};
