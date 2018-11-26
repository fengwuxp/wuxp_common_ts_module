const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackConfig = require('common_webpack/lib/weex/web/webpack.base.config').default;

// console.log("webpackConfig",webpackConfig)
const {DEV_API_ADDRESS} = require('./webpack-config/WebpackConfig');


webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: "index.html",
        title: "template demo",
        chunks: ["app"],
        inject: false,
    }),
    new webpack.DefinePlugin({
        'process.env': {
            // NODE_ENV: '"dev"',
        }
    })
);

module.exports = webpackConfig;
