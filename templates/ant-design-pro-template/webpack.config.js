const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const baseConfig = require("common_webpack/lib/web/antd/antd.webpack.config.template");
// const jspArtTemplate = require("./webpack-config/jspArtTemplate");

const config = {
    ...baseConfig,
    resolve: {
        ...baseConfig.resolve,
        alias: {
            '@services': path.resolve(__dirname, './src/services'),
        }
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        // "rxjs": "rxjs"
    }
};

global["__RESOURCES_BASE_NAME__"] = "";
let basePath = "";
let rootDomain = "";
let nodeDev = "dev";

const htmlPluginOptions = {
    chunks: ['app']
};

const title = "antd manager template";


if (process.env.RELEASE === "1") {
    global["__RESOURCES_BASE_NAME__"] = "/admin/views/";
    config.output.publicPath = `${global["__RESOURCES_BASE_NAME__"]}`;
    basePath = "/admin";
    htmlPluginOptions.template = "./src/index.html";
    htmlPluginOptions.template = "./src/index.art";
    htmlPluginOptions.filename = "../jsp/index.jsp";
    // htmlPluginOptions.jspArtTemplate = jspArtTemplate;
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
