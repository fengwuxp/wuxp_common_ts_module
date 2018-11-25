import * as webpack from "webpack";
import * as path from "path";
import babelLoader from "../../loader/BabelLoader";
import awesomeTypescriptLoader from "../../loader/TypescriptLoader";
import {cssModuleLoader} from "../../style/CssModuleUtils";
import * as ExtractTextWebpackPlugin from "extract-text-webpack-plugin";
import {getThemeConfig} from "../../style/ThemeConfig";

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
            //使用.browserslistrc的统一配置
            autoprefixer(),
            postcssPluginPx2Rem({rootValue: 75, minPixelValue: 1.01})
        ]
    }
};

const weexVuePrecompiler = require('weex-vue-precompiler')();

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
                use: [
                    {
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
                            },

                        }
                    }
                ]
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
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    cssModuleLoader,
                    postcssLoader,
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            javascriptEnabled: true,
                            modifyVars: getThemeConfig(),
                            ident: "less-loader"
                        }
                    }
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
                            ident: "sass-loader"
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new VueLoaderPlugin(),
        bannerPlugin,
        new ExtractTextWebpackPlugin({
            filename: "[name].css",
            allChunks: true
        }),
    ]
};


webpackConfig.mode = "development";

export default webpackConfig
