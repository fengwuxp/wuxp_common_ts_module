const path = require("path");

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                loader:  path.resolve(__dirname,'./loaders/example-loader.js'),
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
            path.resolve(__dirname, './loaders/'),
            'node_modules'
        ]
    }
};