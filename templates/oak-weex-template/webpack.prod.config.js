const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackConfig = require('common_webpack/lib/weex/web/webpack.config.prod').default;
const {PROD_API_ADDRESS} = require('./webpack-config/WebpackConfig');

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
            NODE_ENV: '"prod"',
            API_ROOT: JSON.stringify(PROD_API_ADDRESS)
        }
    }));

module.exports = webpackConfig;
