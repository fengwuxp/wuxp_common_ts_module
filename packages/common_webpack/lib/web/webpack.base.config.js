import * as path from "path";
import * as ExtractTextWebpackPlugin from "extract-text-webpack-plugin";
const CleanWebpackPlugin = require("clean-webpack-plugin");
import { isExclude } from "../utils/WebpackUtils";
import coverThemeLessLoader from "../style/CoverThemeLessLoader";
import { scssModuleLoader, cssModuleLoader } from "../style/CssModuleUtils";
import { DEPLOYMENT_DIRECTORY, PROJECT_DIR } from "../config/webpackConfig";
/**
 * 获取打包配置
 * @param {GetWebpackBaseConfigOptions} options
 * @return {webpack.Configuration}
 */
export const getWebpackBaseConfig = function (options) {
    console.log("---------初始化打包配置--------", options);
    //默认打包目录
    const packPath = path.resolve("src", '../dist');
    const config = {
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
                    exclude: isExclude,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                "presets": [
                                    [
                                        "@babel/preset-env",
                                        {
                                            "targets": "last 2 versions, ie 11",
                                            "modules": false
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.ts[x]?$/,
                    exclude: isExclude,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                "presets": [
                                    [
                                        "@babel/preset-env",
                                        {
                                            "targets": "last 2 versions, ie 11",
                                            "modules": false
                                        }
                                    ]
                                ]
                            }
                        },
                        { loader: "awesome-typescript-loader" }
                    ]
                },
                {
                    test: /\.css$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            cssModuleLoader,
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
                coverThemeLessLoader(options),
                {
                    test: /\.s[c|a]ss$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            // require.resolve("style-loader"),
                            scssModuleLoader,
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
                                    const uri = path.join(global['__RESOURCES_BASE_NAME__'], url).replace(/\\/g, '/');
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
    let release = process.env.release;
    if (release === "1") {
        //重写打包目录到部署目录
        config.output.path = DEPLOYMENT_DIRECTORY;
    }
    if (release != null) {
        config.plugins.push(
        //git https://github.com/johnagan/clean-webpack-plugin
        //先将部署目录清除
        new CleanWebpackPlugin([
            config.output.path
        ], {
            root: PROJECT_DIR,
            // verbose: true,        　　　　　　　  //开启在控制台输出信息
            // dry: false        　　　　　　　　　　//启用删除文件,
            allowExternal: true,
        }));
    }
    return config;
};
