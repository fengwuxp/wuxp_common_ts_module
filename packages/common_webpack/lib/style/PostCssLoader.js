"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
/**
 * postcss-loader
 * @author wxup
 * @create 2018-09-25 11:15
 **/
var PostCssLoader = {
    loader: "postcss-loader",
    // ident: 'postcss',
    options: {
        ident: "css-loader",
        config: {
            path: path.resolve(__dirname, "../../../..") + "/"
        },
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
    }
};
exports.default = PostCssLoader;
