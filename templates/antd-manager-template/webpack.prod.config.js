const baseConfig = require("./webpack/webpack.prod.config.template");
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");


const config = {
    ...baseConfig,
};
config.plugins.unshift(
    new webpack.DefinePlugin({
        'process.env': {
            /**
             * 环境变量
             */
            NODE_ENV: JSON.stringify("prod"),
            /**
             * api请求 根域名
             */
            ROOT_DOMAIN: JSON.stringify("/"),

            /**
             * 项目部署根目录
             */
            BASE_NAME: JSON.stringify("/h5")
        }
    }),
    new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: "index.html",
        title: "antd template",
        chunks: ['app', 'common'],
        inject: true,
    }),
);


module.exports = config;
