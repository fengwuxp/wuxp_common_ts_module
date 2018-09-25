"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
var path = require("path");
var BabelLoader_1 = require("../../loader/BabelLoader");
var TypescriptLoader_1 = require("../../loader/TypescriptLoader");
var CssModuleUtils_1 = require("../../style/CssModuleUtils");
var PostCssLoader_1 = require("../../style/PostCssLoader");
var VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
var bannerPlugin = new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true
});
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
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    CssModuleUtils_1.cssModuleLoader,
                    PostCssLoader_1.default
                ]
            },
            {
                test: /\.s[c|a]ss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    CssModuleUtils_1.cssModuleLoader,
                    PostCssLoader_1.default,
                    {
                        loader: "sass-loader",
                        options: {
                            ident: "css-loader"
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        bannerPlugin
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
