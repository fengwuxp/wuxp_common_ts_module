const path = require("path");

module.exports = {

    entry: "./test/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: path.resolve(__dirname, './dist/index.js'),
                exclude: /node_modules/,
                options: {
                    replaceMap: {
                        "loaded": "yeah"
                    }
                }
            }
        ]
    },
    resolveLoader: {
        modules: [
            path.resolve(__dirname, './dist/'),
            'node_modules'
        ]
    }
};