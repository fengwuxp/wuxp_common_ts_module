import * as webpack from "webpack";
import * as path from "path";
import babelLoader from "../../loader/BabelLoader";
import awesomeTypescriptLoader from "../../loader/TypescriptLoader";
import {cssModuleLoader} from "../../style/CssModuleUtils";
import PostCssLoader from "../../style/PostCssLoader";

const {VueLoaderPlugin} = require('vue-loader');

const bannerPlugin = new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true
});


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
                    cssModuleLoader
                    // PostCssLoader
                ]

            },
            {
                test: /\.s[c|a]ss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    cssModuleLoader,
                    // PostCssLoader,
                    {
                        loader: "sass-loader",
                        options:{
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

const weexVuePrecompiler = require('weex-vue-precompiler')();
const postcssPluginWeex = require('postcss-plugin-weex');
const autoprefixer = require('autoprefixer');
const postcssPluginPx2Rem = require('postcss-plugin-px2rem');

(webpackConfig.module.rules[1].use as any).push({
    loader: 'vue-loader',
    options: {
        optimizeSSR: false,
        postcss: [
            postcssPluginWeex(),
            autoprefixer({
                browsers: ['> 0.1%', 'ios >= 8', 'not ie < 12']
            }),
            postcssPluginPx2Rem({rootValue: 75, minPixelValue: 1.01})
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

export default webpackConfig
