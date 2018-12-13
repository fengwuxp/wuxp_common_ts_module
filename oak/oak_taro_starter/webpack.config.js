const path=require("path");

const TypescriptLoader = require("common_webpack/lib/loader/TypescriptLoader").default;
const BabelLoader = require("common_webpack/lib/loader/BabelLoader").default;

const packPath = path.resolve("src", './lib');
module.exports = {

    // mode:"production",
    mode:"development",

    entry: {
        index: path.resolve('src', 'index'),
    },
    output: {
        filename: '[name]_[hash].js',
        chunkFilename: '[name]_[hash].js',
        path: packPath,
    },
    resolve: {
        extensions: [".ts", ".tsx", "d.ts", ".js"],
    },
    devtool: "source-map",
    module: {
        rules: [
            BabelLoader,
            TypescriptLoader
        ]
    },

    plugins: []

};