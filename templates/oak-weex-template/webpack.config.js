const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackConfig = require('fengwuxp_common_webpack_5/lib/weex/web/webpack.base.config').default;

const {DEV_API_DOMAIN} = require('./webpack-config/WebpackConfig');


webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: "index.html",
        title: "template demo",
        chunks: ["app"],
        inject: true
    }),
    new webpack.DefinePlugin({
        'process.env': {
            API_ROOT_PATH: JSON.stringify(`http://${DEV_API_DOMAIN}/api`),
            STATIC_RESOURCE_ROOT_PATH: JSON.stringify(`http://${DEV_API_DOMAIN}`)
        }
    })
);


module.exports = webpackConfig;
