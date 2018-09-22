const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {VueLoaderPlugin} = require('vue-loader');
const {webpackConfig} = require('common_webpack/lib/weex/web/webpack.base.config');

const {DEV_API_ADDRESS} = require('./webpack-config/WebpackConfig');


webpackConfig.mode = "development";
webpackConfig.output.path = path.resolve(__dirname, './dist_web');

webpackConfig.plugins.push(
    new VueLoaderPlugin(),
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
