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
    options: {
        // ident: "css-loader",
        config: {
            path: path.join(__dirname, './PostCss.config.js')
        }
    }
};
exports.default = PostCssLoader;
