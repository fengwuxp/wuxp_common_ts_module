"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
var path = require("path");
var BabelLoader_1 = require("../../loader/BabelLoader");
var TypescriptLoader_1 = require("../../loader/TypescriptLoader");
var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
var ThemeConfig_1 = require("../../style/ThemeConfig");
var CommonpPathAlias_1 = require("../../config/CommonpPathAlias");
var VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
var bannerPlugin = new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true,
    exclude: /\.css$/
});
var postcssPluginWeex = require('postcss-plugin-weex');
var autoprefixer = require('autoprefixer');
var postcssPluginPx2Rem = require('postcss-plugin-px2rem');
var cssLoader = function (_a) {
    var resource = _a.resource;
    return ({
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
};
var postcssLoader = {
    loader: "postcss-loader",
    options: {
        plugins: [
            postcssPluginWeex(),
            //使用.browserslistrc的统一配置
            autoprefixer(),
            postcssPluginPx2Rem({ rootValue: 75, minPixelValue: 1.01 })
        ],
        // config: {
        //     path: path.join(__dirname, '../PostCss.config.js')
        // },
        ident: "css-loader"
    }
};
var weexVuePrecompiler = require('weex-vue-precompiler')();
var webpackConfig = {
    entry: {
        app: path.resolve('src', 'Main'),
    },
    output: {
        path: path.resolve('dist_web'),
        filename: '[name].web.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", "d.ts", ".js", ".vue", ".css", ".scss", ".less", ".png", "jpg", ".jpeg", ".gif"],
        alias: CommonpPathAlias_1.pathAlias
    },
    module: {
        rules: [
            BabelLoader_1.default,
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
                            }
                        }
                    }
                ]
            },
            TypescriptLoader_1.default,
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
                                modifyVars: ThemeConfig_1.getThemeConfig()
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
exports.default = webpackConfig;
