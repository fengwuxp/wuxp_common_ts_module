const path = require("path");
const {getWebpackBaseConfig} = require("common_webpack/lib/web/webpack.base.config");
const {externals} = require("./WebpackExternals");

const config = getWebpackBaseConfig({
    themePath: path.resolve("theme", "index.json")
});
const baseConfig = {
    ...config,
    // externals,
};


baseConfig.plugins = [
    ...config.plugins,
];
baseConfig.mode = "development";

module.exports = {
    baseConfig
};
