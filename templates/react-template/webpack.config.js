const webpack = require("webpack");
const path = require("path");
const {getWebpackBaseConfig} = require("common_webpack/lib/web/webpack.base.config");

const HtmlWebPackPlugin = require("html-webpack-plugin");

const baseConfig = getWebpackBaseConfig({});

const config = {
    ...baseConfig,
    resolve: {
        ...baseConfig.resolve,
        alias: {
            '@services': path.resolve(__dirname, './src/services'),
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
let nodeDev = "dev";

const htmlPluginOptions = {
    chunks: ['app']
};

const title = "react template";


if (process.env.RELEASE === "1") {
    global["__RESOURCES_BASE_NAME__"] = "/h5/views/";
    config.output.publicPath = `${global["__RESOURCES_BASE_NAME__"]}`;
    basePath = "/h5";
    htmlPluginOptions.template = "./src/index.html";
    htmlPluginOptions.filename = "index.html";
    htmlPluginOptions.baseBath = "";
    htmlPluginOptions.inject = false;
    rootDomain = "";
    nodeDev = "test";
} else {
    rootDomain = "";
    htmlPluginOptions.template = "./src/index.html";
    htmlPluginOptions.filename = "index.html";
    htmlPluginOptions.title = title;
    htmlPluginOptions.baseBath = "";
    // htmlPluginOptions.favicon="./favicon.ico";
    htmlPluginOptions.inject = true;
}

const htmlWebPackPlugin = new HtmlWebPackPlugin(htmlPluginOptions);


config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            API_BASE_PATH: JSON.stringify(""),
        }
    }),
    htmlWebPackPlugin
);

module.exports = config;
