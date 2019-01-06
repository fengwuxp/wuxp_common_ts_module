"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var CoverThemeLessLoader_1 = require("../style/CoverThemeLessLoader");
var CssModuleUtils_1 = require("../style/CssModuleUtils");
var webpackConfig_1 = require("../config/webpackConfig");
var BabelLoader_1 = require("../loader/BabelLoader");
var TypescriptLoader_1 = require("../loader/TypescriptLoader");
var PostCssLoader_1 = require("../style/PostCssLoader");
var awesome_typescript_loader_1 = require("awesome-typescript-loader");
var CommonpPathAlias_1 = require("../config/CommonpPathAlias");
/**
 * 获取打包配置
 * @param {GetWebpackBaseConfigOptions} options
 * @return {webpack.Configuration}
 */
exports.getWebpackBaseConfig = function (options) {
    console.log("---------初始化打包配置--------", options);
    //默认打包目录
    var packPath = path.resolve("src", '../dist');
    var config = {
        entry: {
            app: path.resolve('src', 'App'),
        },
        output: {
            filename: '[name]_[hash].js',
            chunkFilename: '[name]_[hash].js',
            path: packPath,
            publicPath: "/"
        },
        resolve: {
            extensions: [".ts", ".tsx", "d.ts", ".js", ".css", ".scss", ".less", ".png", "jpg", ".jpeg", ".gif"],
            alias: CommonpPathAlias_1.pathAlias
        },
        devtool: "source-map",
        module: {
            rules: [
                BabelLoader_1.default,
                TypescriptLoader_1.default,
                {
                    test: /\.css$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            CssModuleUtils_1.cssModuleLoader,
                            PostCssLoader_1.default
                        ]
                    }),
                },
                CoverThemeLessLoader_1.default(options),
                {
                    test: /\.s[c|a]ss$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            // require.resolve("style-loader"),
                            CssModuleUtils_1.cssModuleLoader,
                            PostCssLoader_1.default,
                            {
                                loader: "sass-loader",
                                options: {
                                    ident: "css-loader"
                                }
                            }
                        ]
                    })
                },
                {
                    test: /\.(png|jpg|jpeg|svg|gif)/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 25000
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|svg|ttf|eot)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            //项目设置打包到dist下的fonts文件夹下
                            options: {
                                name: 'fonts/[name].[hash:8].[ext]',
                                //20kb以下的直接打包到css文件中
                                limit: 1024 * 20,
                                //返回最终的资源相对路径
                                publicPath: function (url) {
                                    //使用全局变量来传递 资源根路径
                                    var uri = path.join(global['__RESOURCES_BASE_NAME__'], url).replace(/\\/g, '/');
                                    return uri;
                                }
                            },
                        }
                    ]
                }
            ]
        },
        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: __assign({}, (webpackConfig_1.EXTERNALS || {})),
        plugins: [
            new ExtractTextWebpackPlugin({
                filename: "[name].css",
                allChunks: true
            }),
            //tsconfig.ts 中就可以愉快的使用baseUrl, paths
            new awesome_typescript_loader_1.TsConfigPathsPlugin()
            // new WriteFilePlugin({
            //     // test: /^((?!\.hot-update).)*$/,
            //     test: /\.jsp|\.tld|\.xml$/,
            // })
        ]
    };
    //是否打release包
    var release = process.env.release;
    if (release === "1") {
        //重写打包目录到部署目录
        config.output.path = webpackConfig_1.DEPLOYMENT_DIRECTORY;
    }
    if (release != null) {
        config.plugins.push(
        //git https://github.com/johnagan/clean-webpack-plugin
        //先将部署目录清除
        new CleanWebpackPlugin([
            config.output.path
        ], {
            root: webpackConfig_1.PROJECT_DIR,
            // verbose: true,        　　　　　　　  //开启在控制台输出信息
            // dry: false        　　　　　　　　　　//启用删除文件,
            allowExternal: true,
        }));
    }
    return config;
};
