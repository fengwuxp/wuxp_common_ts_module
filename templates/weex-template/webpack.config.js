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
            IS_WEB: true,
            // NODE_ENV: '"dev"',
            API_ROOT: JSON.stringify(DEV_API_ADDRESS)
        }
    })
);

module.exports = webpackConfig;
