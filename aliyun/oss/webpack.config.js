const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {getWebpackLibraryTargetConfig} = require("common_webpack/lib/library/webpack.library.conf");


const config = getWebpackLibraryTargetConfig({
    entry: {
        index: path.resolve('src', 'index.ts'),
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, "./lib"),
        libraryTarget: "commonjs"
    },
    production: process.env.production || false,
    plugins: [
        //复制
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, "./types/index.d.ts"),
                to: path.resolve(__dirname, "./lib/index.d.ts"),
            }
        ])
    ]
});

// config.externals = {
//     "ali-oss": "OSS",
// };
module.exports = config;