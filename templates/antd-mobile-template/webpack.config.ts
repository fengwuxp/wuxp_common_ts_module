import * as webpack from "webpack";
import * as path from "path";
import {baseConfig} from "antd_mobile_starter/webpack/webpack.config.template";

const jspArtTemplate = require("./webpack-config/jspArtTemplate");

const HtmlWebPackPlugin = require("html-webpack-plugin");


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

const htmlPluginOptions: any = {
    chunks: ['app']
};

const title = "antd mobile template";


if (process.env.RELEASE === "1") {
    global["__RESOURCES_BASE_NAME__"] = "/h5/views/";
    config.output.publicPath = `${global["__RESOURCES_BASE_NAME__"]}`;
    basePath = "/h5";
    // htmlPluginOptions.template = "./src/index.html";
    htmlPluginOptions.template = "./src/index.art";
    htmlPluginOptions.filename = "../jsp/index.jsp";
    htmlPluginOptions.jspArtTemplate = jspArtTemplate;
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

export {
    config
}
