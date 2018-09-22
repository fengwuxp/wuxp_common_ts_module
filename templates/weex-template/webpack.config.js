const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require('wxp_weex_components/webpack-web/webpack.base.config');
const webpack = require('webpack');
const {DEV_API_ADDRESS} = require('./webpack-config/WebpackConfig');

config.plugins.push(
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: "index.html",
        title: "刮刮彩",
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
