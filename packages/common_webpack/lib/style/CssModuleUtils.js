"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssModuleLoader = function (_a) {
    var resource = _a.resource;
    return ({
        ident: "css-loader",
        loader: 'css-loader',
        options: {
            minimize: true,
            importLoaders: 2,
            //判断是否需要css module
            modules: /\.module\.css/.test(resource),
            localIdentName: '[name]__[local]___[hash:base64:5]',
            ident: "css-loader"
        }
    });
};
