"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
var path = require("path");
var os = require("os");
var HappyPack = require("happypack");
var BabelLoader_1 = require("../../loader/BabelLoader");
var TypescriptLoader_1 = require("../../loader/TypescriptLoader");
var VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
var bannerPlugin = new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true
});
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
HappyPack.SERIALIZABLE_OPTIONS = HappyPack.SERIALIZABLE_OPTIONS.concat([
    'postcss'
]);
var webpackConfig = {
    entry: {
        app: path.resolve('src', 'Main'),
    },
    output: {
        path: path.resolve('dist_web'),
        filename: '[name].web.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", "d.ts", ".js", ".css", ".vue"]
    },
    module: {
        rules: [
            BabelLoader_1.default,
            {
                test: /\.vue(\?[^?]+)?$/,
                use: []
            },
            TypescriptLoader_1.default,
            {
                // 配置sass编译规则
                test: /\.s[a|c]ss$/,
                loader: ['style-loader', 'css-loader', "sass-loader"]
            },
            {
                test: /\.less/,
                loader: ['style-loader', 'css-loader', "sass-loader"]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        bannerPlugin,
        new HappyPack({
            id: 'babel',
            verbose: true,
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool
        }),
        new HappyPack({
            id: 'css',
            verbose: true,
            loaders: ['postcss-loader'],
            threadPool: happyThreadPool
        })
    ]
};
var weexVuePrecompiler = require('weex-vue-precompiler')();
var postcssPluginWeex = require('postcss-plugin-weex');
var autoprefixer = require('autoprefixer');
var postcssPluginPx2Rem = require('postcss-plugin-px2rem');
webpackConfig.module.rules[1].use.push({
    loader: 'vue-loader',
    options: {
        optimizeSSR: false,
        postcss: [
            postcssPluginWeex(),
            autoprefixer({
                browsers: ['> 0.1%', 'ios >= 8', 'not ie < 12']
            }),
            postcssPluginPx2Rem({ rootValue: 75, minPixelValue: 1.01 })
        ],
        compilerOptions: {
            modules: [
                {
                    postTransformNode: function (el) {
                        weexVuePrecompiler(el);
                    }
                }
            ]
        },
        loaders: {
            js: 'happypack/loader?id=babel',
            scss: 'vue-style-loader!css-loader!sass-loader'
        }
    }
});
webpackConfig.mode = "development";
exports.default = webpackConfig;
