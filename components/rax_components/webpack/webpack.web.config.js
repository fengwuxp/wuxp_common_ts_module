const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const webpack = require('webpack');
const RaxWebpackPlugin = require('rax-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('watch-missing-node-modules-webpack-plugin');


module.exports = {
    entry: {
        app: path.resolve('src', 'index'),
    },
    output: {
        path: path.resolve(__dirname, 'dist_web'),
        filename: '[name].js'
    },
    plugins: [
        new RaxWebpackPlugin({
            target: 'bundle',
            frameworkComment: '// {"framework" : "Rax"}',
            // component mode build config
            moduleName: 'rax',
            globalName: 'Rax',
            // Enable external builtin modules, defaultState is false
            //是否使用外部模块
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

        new HtmlWebpackPlugin({
            template: './index.html',
            filename: "index.html",
            title: "rax demo",
            chunks: ["app"]
        }),
        new webpack.DefinePlugin({
            'process.env': {
                // Useful for determining whether we’re running in production mode.
                // Most importantly, it switches React into the correct mode.
                'NODE_ENV': JSON.stringify(
                    process.env.NODE_ENV || 'development'
                ),
                BABEL_NO_ADD_MODULE_EXPORTS: JSON.stringify(true),
                IS_WEB: JSON.stringify(true),
                BASE_PATH: JSON.stringify("http://test.qdzbd.com/rax/"),
                // Useful for resolving the correct path to static assets in `public`.
                // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
                // This should only be used as an escape hatch. Normally you would put
                // images into the `src` and `import` them in code to get their paths.
                'PUBLIC_URL': JSON.stringify("")
            }
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
        new WatchMissingNodeModulesPlugin(path.resolve(__dirname, "node_modules")),
    ],
    resolve: {
        extensions: [".ts", ".tsx", "d.ts", ".js", ".jsx", ".css", ".scss"],
        alias: {
            'react': 'rax',
            'react-dom': 'rax-dom',
            // Not necessary unless you consume a module using `createClass`
            // '//create-react-class': "rax/lib/createClass"
        }
    },
    module: {
        rules: [
            {
                test: /\.ts[x]?$/,
                // exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['es2015', "stage-2", 'rax']
                        }
                    },
                    {loader: "awesome-typescript-loader"}
                ]
            },

            {
                test: /\.js[x]?$/,
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
                // 配置sass编译规则
                test: /\.s[a|c]ss$/,
                use: [
                    {loader: "stylesheet-loader"},
                    {loader: "sass-loader"}
                ]
            },
            {
                test: /\.css$/,
                loader: "stylesheet-loader!typings-for-css-modules-loader"
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

