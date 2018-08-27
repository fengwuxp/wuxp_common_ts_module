const path = require('path');
const webpack = require('webpack');
const RaxWebpackPlugin = require('rax-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('watch-missing-node-modules-webpack-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    entry: {
        app: path.resolve('src', 'index'),
    },
    output: {
        path: path.resolve(__dirname, 'dist_web'),
        filename: '[name].web.js'
    },
    plugins: [
        new RaxWebpackPlugin({
            target: 'bundle',
            frameworkComment: '// {"framework" : "Rax"}',
            // component mode build config
            moduleName: 'rax',
            globalName: 'Rax',
            // Enable external builtin modules, defaultState is false
            externalBuiltinModules: true,
            // Config which builtin modules should external, defaultState config is define in `RaxPlugin.BuiltinModules`
            builtinModules: RaxWebpackPlugin.BuiltinModules,
            // Enable include polyfill files
            includePolyfills: false,
            // Config which polyfill should include, defaut is empty
            polyfillModules: [],
            // Check duplicate dependencies, defaultState is ['rax']
            duplicateCheck: ['rax'],
        }),
        new UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.BABEL_NO_ADD_MODULE_EXPORTS': JSON.stringify(true)
        }),
        // This is necessary to emit hot updates (currently CSS only):
        // new webpack.HotModuleReplacementPlugin(),
        // Watcher doesn't work well if you mistype casing in a path so we use
        // a plugin that prints an error when you attempt to do this.
        // See https://github.com/facebookincubator/create-react-app/issues/240
        new CaseSensitivePathsPlugin(),
        // If you require a missing module and then `npm install` it, you still have
        // to restart the development server for Webpack to discover it. This plugin
        // makes the discovery automatic so you don't have to restart.
        // See https://github.com/facebookincubator/create-react-app/issues/186
        new WatchMissingNodeModulesPlugin(path.resolve(__dirname, "node_modules"))
    ],
    resolve: {
        extensions: [".ts", ".tsx", "d.ts", ".js", ".jsx", ".css",".scss"],
        alias: {
            'react': 'rax'
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['es2015', "stage-2", 'rax']
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.ts[x]?$/,
                // exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            presets: ['es2015', "stage-2", 'rax']
                        }
                    },
                    {loader: "awesome-typescript-loader"}
                ]
            },
            {
                // 配置sass编译规则
                test: /\.s[a|c]ss$/,
                use: [
                    {loader: "stylesheet-loader"},
                    {loader: "sass-loader"}
                ]
            },
            {
                test: /\.css$/,
                loader: "stylesheet-loader"
            },
            // JSON is not enabled by defaultState in Webpack but both Node and Browserify
            // allow it implicitly so we also enable it.
            {
                test: /\.json$/,
                loader: 'json'
            },
            // load inline images using image-source-loader for Image
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'image-source'
            }
        ]
    }
};

