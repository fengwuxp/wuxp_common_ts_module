"use strict";
exports.__esModule = true;
var autoprefixer_1 = require("autoprefixer");
exports.postCssConfig = {
    // https://webpack.js.org/guides/migrating/#complex-options
    ident: 'postcss',
    plugins: function () { return [
        require('postcss-flexbugs-fixes'),
        require('precss'),
        require('postcss-cssnext'),
        autoprefixer_1["default"]({
            browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9',
            ],
            flexbox: 'no-2009'
        }),
    ]; }
};
