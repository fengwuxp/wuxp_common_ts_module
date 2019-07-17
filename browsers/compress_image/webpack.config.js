const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {getWebpackLibraryTargetConfig} = require("fengwuxp_common_webpack/lib/library/webpack.library.conf");


const config = getWebpackLibraryTargetConfig({
    entry: {
        index: path.resolve('src', 'Compress.ts'),
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.resolve(__dirname),
        libraryTarget: "commonjs"
    },
    production: process.env.production || false,
    plugins:[
        //复制
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, "./src/Compress.d.ts"),
                to: path.resolve(__dirname, "./index.d.ts"),
            }
        ])
    ]
});



module.exports = config;