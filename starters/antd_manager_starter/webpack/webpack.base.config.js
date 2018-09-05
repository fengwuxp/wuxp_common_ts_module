const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const {scssModuleLoader, cssModuleLoader} = require('./cssModuleUtils');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const getLessLoader = require("./getLessLoader");

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
 * 获取 打包配置
 * @param options
 *   {
 *     packagePath:"",  //packageJson的文件的地址
 *     themePath:"",    //样式js所在地址
 *   }
 * @return {{entry: {app: string}, output: {filename: string, chunkFilename: string, path: string, publicPath: string}, resolve: {extensions: string[]}, module: {rules: *[]}, externals: {react: string, "react-dom": string}}}
 */
const getWebpackBaseConfig = function (options) {

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
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    "react",
                                    "env"
                                ],
                                compact: true
                            }
                        }
                    ]
                },
                {
                    test: /\.ts[x]?$/,
                    // exclude: isExclude,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                cacheDirectory: true,
                                presets: ['es2015', 'stage-2']
                            }
                        },
                        {loader: "awesome-typescript-loader"}
                    ]
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
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
                    })
                },

                getLessLoader(options),

                {
                    test: /\.s[c|a]ss$/,
                    use: [
                        require.resolve("style-loader"),
                        scssModuleLoader,
                        {
                            loader: "postcss-loader",
                            options: {
                                config: {
                                    path: path.join(__dirname, './postcss.config.js')
                                }
                            }
                        },
                        {loader: "sass-loader"}
                    ]
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
        plugins: []
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
                beforeEmit: true                       //在将文件发送到输出目录之前执行清理
            }),
        );
    }


    return config;
};


module.exports = {
    getWebpackBaseConfig
};

