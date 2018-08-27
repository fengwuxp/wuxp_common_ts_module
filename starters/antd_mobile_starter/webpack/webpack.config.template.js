const path=require("path");

const {getWebpackBaseConfig}=require("common_starter/webpack/webpack.base.config");



const baseConfig = getWebpackBaseConfig({
    themePath: path.resolve("theme", "index.json")
});
const config = {
    ...baseConfig,
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        // "moment": "moment"
    },
};


config.plugins = [
    ...config.plugins,
];
config.mode = "development";

module.exports=config;
