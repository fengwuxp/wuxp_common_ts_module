const webpack = require("webpack");
const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const wuxpModuleList = [
    "common_utils"
];

const isExclude = function (path) {
    const isWxpComponents = wuxpModuleList.some((item) => {
        return path.indexOf(item) >= 0;
    });

    if (isWxpComponents) {
        return false;
    }
    //是否为node_modules中的模块
    return path.indexOf("node_modules") >= 0;
};

module.exports = {
    entry: {
        background: path.join(__dirname, '../src/background.ts'),
        content_script: path.join(__dirname, '../src/content_script.ts'),
        injected_script: path.join(__dirname, '../src/injected_script.ts'),
    },
    output: {
        path: path.join(__dirname, '../dist/js'),
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: "initial"
        }
    },
    module: {
        rules: [
            {
                test: /\.ts[x]?$/,
                exclude: isExclude,
                use: [
                    {
                        loader: "awesome-typescript-loader",
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [

        //复制文件
        new CopyWebpackPlugin([{
            from: path.join(__dirname, "../resources"),
            to: path.join(__dirname, "../dist")
        }]),
        // exclude locale files in moment
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
};
