const path = require('path');
const {getWebpackBaseConfig} = require("./webpack.base.config");
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const baseConfig = getWebpackBaseConfig({
    themePath: path.resolve("theme", "index.json")
});
const config = {
    ...baseConfig
};


config.plugins = [
    ...config.plugins,
    new ExtractTextPlugin('styles.css')
];

module.exports = config;
