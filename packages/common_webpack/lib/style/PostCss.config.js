"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    // https://webpack.js.org/guides/migrating/#complex-options
    ident: 'postcss',
    plugins: function (loader) { return [
        require('postcss-preset-env')({
            stage: 3,
        }),
        require('postcss-import')({
            root: loader.resourcePath,
        }),
        require('postcss-flexbugs-fixes'),
        require('precss'),
        //使用.browserslistrc的统一配置
        require('autoprefixer')(),
    ]; }
};
