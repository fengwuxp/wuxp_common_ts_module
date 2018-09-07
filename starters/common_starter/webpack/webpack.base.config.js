const webpack = require("webpack");
const path = require("path");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const {isExclude} = require("./WebpackUtils");
const {getLessLoader} = require("./getLessLoader");
const {scssModuleLoader, cssModuleLoader} = require("./cssModuleUtils");

//多线程打包
const HappyPack = require('happypack');
const os = require('os'); // 系统操作函数
// 指定线程池个数
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});


function getWebpackConfig() {
    if (process.env._self !== "1") {
        return require("../../../webpack-config/WebpackConfig");
    }
    return {};
}

const {
    DEPLOYMENT_DIRECTORY,
    PROJECT_DIR
} = getWebpackConfig();


/**
 * 获取打包配置
 * @param {GetWebpackBaseConfigOptions} options
 * @return {webpack.Configuration}
 */
getWebpackBaseConfig = function (options) {

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

        module: {
            rules: [
                {
                    test: /\.js[x]?$/,
                    // exclude: /(node_modules|bower_components)/,
                    exclude: isExclude,
                    // use: ['happypack/loader?id=jsx']
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                // presets: ['es2015', 'stage-2'],
                                cacheDirectory: true,
                                presets: ["react", "env"],
                                plugins: [
                                    //exnext 动态导入
                                    'syntax-dynamic-import'
                                ],
                                compact: true
                            }
                        }
                    ]
                },
                {
                    test: /\.ts[x]?$/,
                    exclude: isExclude,
                    // loaders:`${HappyLoader}?id=tsx`,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                cacheDirectory: true,
                                presets: ["react", "env"],
                                plugins: ['syntax-dynamic-import'],
                                compact: true
                            }
                        },
                        {loader: "awesome-typescript-loader"}
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
                                        path: path.join(__dirname, './postCss.config.ts')
                                    }
                                }
                            }
                        ]
                    }),

                },
                getLessLoader(options),

                {
                    test: /\.s[c|a]ss$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            scssModuleLoader,
                            {
                                loader: "postcss-loader",
                                options: {
                                    config: {
                                        path: path.join(__dirname, './PostCss.config.ts')
                                    }
                                }
                            },
                            {loader: "sass-loader"}
                        ]
                    })
                },
                {
                    test: /\.(png|jpg|svg)/,
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
                                    let uri = path.join(global['__RESOURCES_BASE_NAME__'], url).replace(/\\/g, '/');
                                    return uri;
                                }
                            },

                        }
                    ]
                },
                {
                    test: /\.art$/,
                    loader: "art-template-loader",
                    options: {
                        escape: false
                        // art-template options (if necessary)
                        // @see https://github.com/aui/art-template
                    }
                }
            ],
            noParse: function (content) { // content 从入口开始解析的模块路径
                return /no-parser/.test(content); // 返回true则忽略对no-parser.js的解析
            }
        },

        plugins: [
            new ExtractTextWebpackPlugin({
                filename: "style.css",
                allChunks: true
            }),

            // new HappyPack({
            //     id: 'jsx',
            //     threadPool: happyThreadPool,
            //     threads: 2,
            //     verbose: true,
            //     loaders: [
            //         {
            //             loader: "babel-loader",
            //             options: {
            //                 cacheDirectory: true,
            //                 presets: ["react", "env"],
            //             }
            //         }
            //     ]
            // }),
            // new HappyPack({
            //     id: 'tsx',
            //     threadPool: happyThreadPool,
            //     threads: 2,
            //     verbose: true,
            //     loaders: [
            //         {
            //             loader: "babel-loader",
            //             options: {
            //                 cacheDirectory: true,
            //                 presets: ["react", "env"],
            //             }
            //         },
            //         {loader: "awesome-typescript-loader"}
            //     ],
            // }),
            // new HappyPack({
            //     id: 'scss',
            //     threadPool: happyThreadPool,
            //     threads: 2,
            //     verbose: true,
            //     loaders: [
            //         'style-loader',
            //         'css-loader',
            //         'postcss-loader',
            //         'sass-loader',
            //     ],
            // }),
            // new HappyPack({
            //     id: 'less',
            //     threadPool: happyThreadPool,
            //     threads: 2,
            //     verbose: true,
            //     loaders: [
            //         'style-loader',
            //         'css-loader',
            //         'postcss-loader',
            //         'sass-loader',
            //     ],
            //
            // })
            // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
            // new WriteFilePlugin({
            //     // test: /^((?!\.hot-update).)*$/,
            //     test: /\.jsp|\.tld|\.xml$/,
            // })
        ]
    };
    //是否打release包
    let release = process.env.RELEASE;
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
                root: PROJECT_DIR,       　　　　　　   //根目录
                // verbose: true,        　　　　　　　  //开启在控制台输出信息
                // dry: false        　　　　　　　　　　//启用删除文件,
                allowExternal: true,                  //允许删除wbpack根目录之外的文件
                // beforeEmit: true                       //在将文件发送到输出目录之前执行清理
            }),
        );
    }


    return config;
};


module.exports = {
    getWebpackBaseConfig
};
