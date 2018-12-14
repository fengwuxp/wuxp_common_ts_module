const path = require("path");
// const {getWebpackLibraryTargetConfig} = require("common_webpack/lib/library/webpack.library.conf");
const TypescriptLoader = require("common_webpack/lib/loader/TypescriptLoader").default;
const BabelLoader = require("common_webpack/lib/loader/BabelLoader").default;


// module.exports = getWebpackLibraryTargetConfig({
//     entry: {
//         index: path.resolve('src', 'index'),
//     },
//     production: true
// });


const packPath = path.resolve(__dirname, './lib');
module.exports = {

    // mode: "production",
    mode:"development",
    entry: {
        index: path.resolve('src', 'index'),
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: packPath,
        libraryTarget: "commonjs"
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