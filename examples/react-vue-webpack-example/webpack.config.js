const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const {VueLoaderPlugin} = require('vue-loader');
const babel7Options = require("./.babelrc");

const cssModuleLoader = ({resource}) => ({
    loader: 'css-loader',
    options: {
        minimize: true,
        importLoaders: 1,
        //判断是否需要css module
        modules: /\.module\.css/.test(resource),
        localIdentName: '[name]__[local]___[hash:base64:5]',
        ident: "css-loader"
    }
});

const lessModuleLoader = ({resource}) => ({
    loader: 'css-loader',
    options: {
        minimize: true,
        importLoaders: 2,
        //判断是否需要css module
        modules: /\.module\.less/.test(resource),
        localIdentName: '[name]__[local]___[hash:base64:5]',
        ident: "css-loader"
    }
});

const scssModuleLoader = ({resource}) => ({
    loader: 'css-loader',
    options: {
        minimize: true,
        importLoaders: 2,
        //判断是否需要css module
        modules: /\.module\.scss/.test(resource),
        localIdentName: '[name]__[local]___[hash:base64:5]',
        ident: "css-loader"
    }
});

const PostCssLoader = {
    loader: "postcss-loader",
    // ident: 'postcss',
    options: {
        ident: "css-loader",
        config: {},
        plugins: loader => [
            require('postcss-preset-env')({
                stage: 3,
            }),
            require('postcss-import')({
                root: loader.resourcePath,
            }),
            require('postcss-flexbugs-fixes'),
            require('precss'),
            //使用.browserslistrc的统一配置
            require('autoprefixer')(),
        ]
    }
};

module.exports = {
    entry: {
        app: path.join(__dirname, "./src/App"),
        // app: path.join(__dirname, "./src/VueMain.js")
    },
    output: {
        filename: '[name]_[hash].js',
        chunkFilename: '[name]_[hash].js',
        path: path.join(__dirname, "./dist"),
        publicPath: "/"
    },
    resolve: {
        extensions: [".ts", ".tsx", "d.ts", ".js", ".vue", ".css", ".scss", ".less", ".png", "jpg", ".jpeg", ".gif"],
        alias: {
            "@src": path.resolve("src/"),
            "@api": path.resolve("src/api/"),
            "@feign": path.resolve("src/feign/"),
            "@enums": path.resolve("src/enums/"),
            "@config": path.resolve("src/config/"),
            "@constant": path.resolve("src/constant/"),
            "@components": path.resolve("src/components/"),
            "@views": path.resolve("src/views/"),
            "@pages": path.resolve("src/pages/"),
            "@utils": path.resolve("src/utils/"),
        }
    },
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                // exclude: function (path) {
                //     console.log("-->",path)
                //     //是否为node_modules中的模块
                //     return path.indexOf("node_modules") >= 0;
                // },
                use: [
                    {
                        loader: "babel-loader",
                        // options: babel7Options
                    }
                ]
            },
            {
                test: /\.ts[x]?$/,
                // exclude: isExclude,
                use: [
                    // 链式调用
                    // {
                    //     loader: "babel-loader",
                    //     options: babel7Options
                    // },
                    {

                        loader: "awesome-typescript-loader",
                        options: {
                            useCache: true
                        }
                    }
                ]
            },
            {
                test: /\.vue(\?[^?]+)?$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            optimizeSSR: false,
                            compilerOptions: {}
                        }
                    }
                ]
            },
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
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        lessModuleLoader,
                        PostCssLoader,
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true,
                                javascriptEnabled: true,
                                modifyVars: {},
                                ident: "css-loader"
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
                        scssModuleLoader,
                        PostCssLoader,
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
                            // publicPath(url) {
                            //     //使用全局变量来传递 资源根路径
                            //     return path.join(options.staticResourcesBasePath || "./", url)
                            //         .replace(/\\/g, '/')
                            //         .replace(/^(http:\/)/, "http://")
                            //         .replace(/^(https:\/)/, "https://");
                            // }
                        },

                    }
                ]
            },
        ]
    },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        // "React":"react"
    },
    plugins: [
        new VueLoaderPlugin(),
        new ExtractTextWebpackPlugin({
            filename: "[name].css",
            allChunks: true
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            inject: true
        })
    ],

};
