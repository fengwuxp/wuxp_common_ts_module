const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const config = require('common_webpack/lib/weex/web/webpack.base.config');

const {DEV_API_ADDRESS} = require('./webpack-config/WebpackConfig');

config.plugins.push(
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
            NODE_ENV: '"dev"',
            API_ROOT: JSON.stringify(DEV_API_ADDRESS)
        }
    })
);
module.exports = config;
