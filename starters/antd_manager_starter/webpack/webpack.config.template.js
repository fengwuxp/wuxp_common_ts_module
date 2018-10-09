const path = require("path");
const {getWebpackBaseConfig} = require("common_webpack/lib/web/webpack.base.config");
const {externals} = require("./WebpackExternals");


const baseConfig = getWebpackBaseConfig({
    themePath: path.resolve("theme", "index.json")
});
const config = {
    ...baseConfig,
    externals
};


config.plugins = [
    ...config.plugins,
];
config.mode = "development";

module.exports = config;
