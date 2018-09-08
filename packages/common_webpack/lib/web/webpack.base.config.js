"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var WebpackUtils_1 = require("../utils/WebpackUtils");
var CoverThemeLessLoader_1 = require("../style/CoverThemeLessLoader");
var CssModuleUtils_1 = require("../style/CssModuleUtils");
var webpackConfig_1 = require("../config/webpackConfig");
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
        },
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.js[x]?$/,
                    exclude: WebpackUtils_1.isExclude,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {}
                        }
                    ]
                },
                {
                    test: /\.ts[x]?$/,
                    exclude: WebpackUtils_1.isExclude,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {}
                        },
                        { loader: "awesome-typescript-loader" }
                    ]
                },
                {
                    test: /\.css$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            CssModuleUtils_1.cssModuleLoader,
                            {
                                loader: "postcss-loader",
                                options: {
                                    config: {
                                        path: path.join(__dirname, './postcss.config.js')
                                    }
                                }
                            }
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
                            CssModuleUtils_1.scssModuleLoader,
                            {
                                loader: "postcss-loader",
                                options: {
                                    config: {
                                        path: path.join(__dirname, './postcss.config.js')
                                    }
                                }
                            },
                            { loader: "sass-loader" }
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
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        },
        plugins: [
            new ExtractTextWebpackPlugin({
                filename: "[name].css",
                allChunks: true
            }),
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
