import * as webpack from "webpack";
import * as path from "path";
import * as ExtractTextWebpackPlugin from "extract-text-webpack-plugin";
import {loadLessLoader} from "../style/ThemeLessLoader";
import {cssModuleLoader, scssModuleLoader} from "../style/CssModuleLoader";
import {GetWebpackBaseConfigOptions} from "../GetWebpackBaseConfigOptions";
import {DEPLOYMENT_DIRECTORY, EXTERNALS, PROJECT_DIR} from "../config/webpackConfig";
import babelLoader from "../loader/BabelLoader";
import awesomeTypescriptLoader from "../loader/TypescriptLoader";
import PostCssLoader from "../style/PostCssLoader";
import {pathAlias} from "../config/CommonpPathAlias";
import {genHappyPackLoaderString, getHappyPackPlugin} from "../utils/GetHappyPackPluginConfig";

const CleanWebpackPlugin = require("clean-webpack-plugin");


/**
 * 获取打包配置
 * @param {GetWebpackBaseConfigOptions} options
 * @return {webpack.Configuration}
 */
export const getWebpackBaseConfig = function (options?: GetWebpackBaseConfigOptions): webpack.Configuration {

    // console.log("---------初始化打包配置--------", options);


    //默认打包目录
    const packPath = path.resolve("src", options.outputPath || "../dist");

    const config: webpack.Configuration = {
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
            alias: pathAlias
        },

        devtool: "source-map",
        module: {
            rules: [
                babelLoader,
                options.awesomeTypescriptLoader || awesomeTypescriptLoader,
                {
                    test: /\.css$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            cssModuleLoader,
                            PostCssLoader
                        ]
                    }),

                },
                loadLessLoader(options),

                {
                    test: /\.s[c|a]ss$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            scssModuleLoader,
                            PostCssLoader,
                            genHappyPackLoaderString("scss")
                        ]
                    })
                },
                {
                    test: /\.(png|jpg|jpeg|svg|gif)/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 1024 * 5
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
                                //10kb以下的直接打包到css文件中
                                limit: 1024 * 10,
                                //返回最终的资源相对路径
                                publicPath(url) {
                                    //使用全局变量来传递 资源根路径
                                    return path.join(options.staticResourcesBasePath || "./", url)
                                        .replace(/\\/g, '/')
                                        .replace(/^(http:\/)/, "http://")
                                        .replace(/^(https:\/)/, "https://");
                                }
                            },

                        }
                    ]
                },
                {
                    test: /\.hbs$/,
                    loader: 'handlebars-loader'
                }
            ]
        },
        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            ...(EXTERNALS || {})
        },

        plugins: [
            getHappyPackPlugin("sass", [
                {
                    loader: "sass-loader",
                    options: {
                        ident: "css-loader"
                    }
                }
            ], 2),
            new ExtractTextWebpackPlugin({
                filename: "[name].css",
                allChunks: true
            }),
        ]
    };
    // //是否打release包
    // let release = process.env.release;
    // if (release === "1") {
    //     //重写打包目录到部署目录
    //     config.output.path = DEPLOYMENT_DIRECTORY;
    // }
    // if (release != null) {
    //     config.plugins.push(
    //         //git https://github.com/johnagan/clean-webpack-plugin
    //         //先将部署目录清除
    //         new CleanWebpackPlugin([
    //             config.output.path
    //         ], {
    //             root: PROJECT_DIR,       　　　　　　   //根目录
    //             // verbose: true,        　　　　　　　  //开启在控制台输出信息
    //             // dry: false        　　　　　　　　　　//启用删除文件,
    //             allowExternal: true,                  //允许删除wbpack根目录之外的文件
    //             // beforeEmit: true                    //在将文件发送到输出目录之前执行清理
    //         }),
    //     );
    // }


    return config;
};




