"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var autoprefixer_1 = require("autoprefixer");
exports.default = {
    // https://webpack.js.org/guides/migrating/#complex-options
    ident: 'postcss',
    plugins: function () { return [
        require('postcss-flexbugs-fixes'),
        require('precss'),
        require('postcss-cssnext'),
        autoprefixer_1.default({
            browsers: ['last 4 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
        }),
    ]; }
};
