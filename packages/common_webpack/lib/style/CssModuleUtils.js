"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssModuleLoader = function (_a) {
    var resource = _a.resource;
    return ({
        loader: 'css-loader',
        options: {
            minimize: true,
            importLoaders: 1,
            //判断是否需要css module
            modules: /\.module\.css/.test(resource),
            localIdentName: '[name]__[local]___[hash:base64:5]',
            ident: "css-loader"
        }
    });
};
exports.lessModuleLoader = function (_a) {
    var resource = _a.resource;
    return ({
        loader: 'css-loader',
        options: {
            minimize: true,
            importLoaders: 2,
            //判断是否需要css module
            modules: /\.module\.less/.test(resource),
            localIdentName: '[name]__[local]___[hash:base64:5]',
            ident: "css-loader"
        }
    });
};
exports.scssModuleLoader = function (_a) {
    var resource = _a.resource;
    return ({
        loader: 'css-loader',
        options: {
            minimize: true,
            importLoaders: 2,
            //判断是否需要css module
            modules: /\.module\.scss/.test(resource),
            localIdentName: '[name]__[local]___[hash:base64:5]',
            ident: "css-loader"
        }
    });
};
