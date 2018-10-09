const webpack = require("webpack");
const path = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");
const baseConfig = require("antd_mobile_starter/webpack/webpack.prod.config.template");
const jspArtTemplate = require("./webpack-config/jspArtTemplate");

const config = {
    ...baseConfig,
    resolve: {
        ...baseConfig.resolve,
        alias: {
            "@services": path.resolve(__dirname, './src/services'),
        }
    }
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
};

global["__RESOURCES_BASE_NAME__"] = "";

let basePath = "";
let rootDomain = "";

let htmlPluginOptions = {
    chunks: ['app', "common"],
    inject: false
};

const title = "";

if (process.env.RELEASE === "1") {
    global["__RESOURCES_BASE_NAME__"] = "/h5/views/";
    config.output.publicPath = `${global["__RESOURCES_BASE_NAME__"]}`;
    basePath = "/h5";
    htmlPluginOptions.template = "./src/index.prod.html";
    htmlPluginOptions.filename = "index.html";
    htmlPluginOptions.jspArtTemplate = jspArtTemplate;
    htmlPluginOptions.baseBath = "";
    //正式域名
    rootDomain = "";
} else {
    htmlPluginOptions.template = "./src/index.html";
    htmlPluginOptions.filename = "index.html";
    htmlPluginOptions.title = title;
    htmlPluginOptions.baseBath = "";
    htmlPluginOptions.inject = true;
    rootDomain = "";
}

let htmlWebPackPlugin = new HtmlWebPackPlugin(htmlPluginOptions);


config.plugins.unshift(
    new webpack.DefinePlugin({
        'process.env': {
            /**
             * 环境变量
             */
            // NODE_ENV: JSON.stringify("prod"),
            /**
             * api请求 根域名
             */
            // ROOT_DOMAIN: JSON.stringify("app.hdkt.com"),
            ROOT_DOMAIN: JSON.stringify(rootDomain),

            /**
             * base name
             */
            BASE_NAME: JSON.stringify(basePath),

            WEB_TITLE: JSON.stringify(title)
        }
    }),
    htmlWebPackPlugin
);

module.exports = config;
