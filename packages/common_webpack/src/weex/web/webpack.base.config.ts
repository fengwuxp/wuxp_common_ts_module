import * as webpack from "webpack";
import * as path from "path";
import babelLoader from "../../loader/BabelLoader";
import awesomeTypescriptLoader from "../../loader/TypescriptLoader";
import {cssModuleLoader} from "../../style/CssModuleUtils";


const {VueLoaderPlugin} = require('vue-loader');

const bannerPlugin = new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true
});

const postcssPluginWeex = require('postcss-plugin-weex');
const autoprefixer = require('autoprefixer');
const postcssPluginPx2Rem = require('postcss-plugin-px2rem');
const postcssLoader = {
    loader: "postcss-loader",
    options: {
        plugins: [
            postcssPluginWeex(),
            autoprefixer({
                browsers: ['> 0.1%', 'ios >= 8', 'not ie < 12']
            }),
            postcssPluginPx2Rem({rootValue: 75, minPixelValue: 1.01})
        ],
        ident: "postcss-loader"
    }
};

const webpackConfig: webpack.Configuration = {

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
            babelLoader,
            {
                test: /\.vue(\?[^?]+)?$/,
                use: []
            },
            awesomeTypescriptLoader,
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    cssModuleLoader,
                    postcssLoader
                ]

            },
            {
                test: /\.s[c|a]ss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    cssModuleLoader,
                    postcssLoader,
                    {
                        loader: "sass-loader",
                        options: {
                            ident: "css-loader"
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new VueLoaderPlugin(),
        bannerPlugin
    ]
};

const weexVuePrecompiler = require('weex-vue-precompiler')();


(webpackConfig.module.rules[1].use as Array<any>).push({
    loader: 'vue-loader',
    options: {
        optimizeSSR: false,
        compilerOptions: {
            modules: [
                {
                    postTransformNode: function (el) {
                        weexVuePrecompiler(el);
                    }
                }
            ]
        }
    }
});

webpackConfig.mode = "development";

export default webpackConfig
