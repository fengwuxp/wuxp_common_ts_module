const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {getWebpackLibraryTargetConfig} = require("fengwuxp_common_webpack/lib/library/webpack.library.conf");

const packPath = path.resolve("./lib");
const config = getWebpackLibraryTargetConfig({
    entry: {
        index: path.resolve('./src', 'WebViewApiFactory.ts'),
    },
    output: {
        filename: 'WebViewApiFactory.js',
        chunkFilename: 'WebViewApiFactory.js',
        path: packPath,
        // libraryTarget: "commonjs"
        libraryTarget: "window"
    },
    production: process.env.production || false,
    plugins: [
        //复制
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, "./index.d.ts"),
        //         to: path.resolve(__dirname, "./lib/index.d.ts"),
        //     }
        // ])
    ]
});

module.exports = config;
