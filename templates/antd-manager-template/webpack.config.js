const baseConfig = require("antd_manager_stater/webpack/webpack.config.template");
const HtmlWebPackPlugin = require("html-webpack-plugin");


const config = {
    ...baseConfig,
};

config.plugins.push(
    new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: "index.html",
        title: "antd  template",
        chunks: ['app'],
        inject: true,
    })
);

module.exports = config;
