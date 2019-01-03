import * as webpack from "webpack";
import * as path from "path";
import babelLoader from "../../loader/BabelLoader";
import awesomeTypescriptLoader from "../../loader/TypescriptLoader";

import * as ExtractTextWebpackPlugin from "extract-text-webpack-plugin";
import {getThemeConfig} from "../../style/ThemeConfig";
import {pathAlias} from "../../config/CommonpPathAlias";

const {VueLoaderPlugin} = require('vue-loader');

const bannerPlugin = new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true,
    exclude: /\.css$/
});

const postcssPluginWeex = require('postcss-plugin-weex');
const autoprefixer = require('autoprefixer');
const postcssPluginPx2Rem = require('postcss-plugin-px2rem');

const cssLoader = ({resource}) => ({
    ident: "css-loader",
    loader: 'css-loader',
    options: {
        minimize: true,
        importLoaders: 2,
        // //判断是否需要css module
        // modules: /\.module\.css/.test(resource),
        // localIdentName: '[name]__[local]___[hash:base64:5]',
        ident: "css-loader"
    }
});

const postcssLoader = {
    loader: "postcss-loader",
    options: {
        plugins: [
            postcssPluginWeex(),
            //使用.browserslistrc的统一配置
            autoprefixer(),
            postcssPluginPx2Rem({rootValue: 75, minPixelValue: 1.01})
        ],
        // config: {
        //     path: path.join(__dirname, '../PostCss.config.js')
        // },
        ident: "css-loader"
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
        extensions: [".ts", ".tsx", "d.ts", ".js", ".vue", ".css", ".scss", ".less", ".png", "jpg", ".jpeg", ".gif"],
        alias:pathAlias
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
                                        postTransformNode(el) {
                                            weexVuePrecompiler(el);
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            awesomeTypescriptLoader,
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        cssLoader,
                        postcssLoader

                    ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        cssLoader,
                        postcssLoader,
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true,
                                javascriptEnabled: true,
                                modifyVars: getThemeConfig()
                                // ident: "css-loader"
                            }
                        }
                    ]
                })
            },
            {
                test: /\.s[c|a]ss$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        cssLoader,
                        postcssLoader,
                        {
                            loader: "sass-loader",
                            options: {
                                // ident: "css-loader"
                            }
                        }
                    ]
                })
            }
        ]
    },

    plugins: [
        new VueLoaderPlugin(),
        new ExtractTextWebpackPlugin({
            filename: "[name].css",
            allChunks: true
        }),
        bannerPlugin
    ],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "vue": "Vue",
    },
};


webpackConfig.mode = "development";

export default webpackConfig
