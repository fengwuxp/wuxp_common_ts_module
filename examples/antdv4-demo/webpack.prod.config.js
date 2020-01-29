const webpack = require("webpack");
const path = require("path");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseConfig = require("./webpack.config");
//https://github.com/webpack-contrib/terser-webpack-plugin
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

baseConfig.output.publicPath = "/dist/";
const terserPlugin = new TerserPlugin({
    test: /\.js(\?.*)?$/i,
    terserOptions: {
        parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 6
        },
        compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2
        },
        mangle: {
            safari10: true
        },
        output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true
        }
    },
    // Use multi-process parallel running to improve the build speed
    // Default number of concurrent runs: os.cpus().length - 1
    parallel: true,
    // Enable file caching
    cache: true,
    sourceMap: false
});
const config = {
    ...baseConfig,
    // resolve: {
    //     ...baseConfig.resolve,
    //     alias: {
    //         "@services": path.resolve(__dirname, './src/services'),
    //     }
    // }
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
    mode: "production",
    devtool: false,
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    chunks: 'initial', // 必须三选一： "initial"(初始化) | "all" | "async"(默认就是异步)
                    name: 'common',    // entry中js
                    enforce: true,      // 强制
                    test: /node_modules/,     // 正则规则验证，如果符合就提取 chunk
                    minSize: 0,
                    minChunks: 1,
                    reuseExistingChunk: true   // 可设置是否重用已用chunk 不再创建新的chunk
                }
            }
        },
        minimizer: [
            terserPlugin,
            new OptimizeCSSAssetsPlugin({}),
        ],
        concatenateModules: false
    },
    plugins: [
        ...baseConfig.plugins,
        new BundleAnalyzerPlugin(),
        // terserPlugin,


        // new UglifyJsWebpackPlugin({
        //     //多线程压缩
        //     parallel: true,
        //     uglifyOptions: {
        //         /**
        //          * ecma（默认未定义） - 传递5,6,7或8以覆盖分析，压缩和输出选项。。
        //          */
        //         ecma: 5,
        //         /**
        //          * 警告（默认为false） - 通过true返回result.warnings中的压缩机警告。使用值“详细”更详细的警告。
        //          */
        //         warnings: false,
        //         /**
        //          * 解析（默认{}） - 如果您希望指定一些额外的解析选项，则传递一个对象。
        //          */
        //         parse: {},
        //         /**
        //          * compress（默认{}） - 传递false以完全跳过压缩。传递一个对象来指定自定义压缩选项。
        //          */
        //         compress: {
        //             // 删除所有的 `console` 语句
        //             // 还可以兼容ie浏览器
        //             drop_console: true,
        //             // 内嵌定义了但是只用到一次的变量
        //             collapse_vars: true,
        //             // 提取出出现多次但是没有定义成变量去引用的静态值
        //             reduce_vars: true,
        //         },
        //         /**
        //          * mangle（默认为true） - 传递false以跳过mangling名称，或传递一个对象以指定mangle选项（请参阅下文）。
        //          * mangle.properties（默认为false） - mangle选项的子类别。传递一个对象来指定自定义的mangle属性选项。
        //          * 输出（默认为空） - 如果您希望指定其他输出选项，则传递一个对象。默认值已经过优化以获得最佳压缩效果。
        //          */
        //         // mangle:true,
        //         /**
        //          * 输出（默认为空） - 如果您希望指定其他输出选项，则传递一个对象。默认值已经过优化以获得最佳压缩效果。
        //          */
        //         // output: {
        //         //     comments: false,
        //         //     beautify: false,
        //         //
        //         // },
        //         /**
        //          * toplevel（默认为false） - 如果您希望启用顶级变量和函数名称修改并删除未使用的变量和函数，则设置为true。
        //          */
        //         toplevel: false,
        //         /**
        //          * nameCache（默认为空） - 如果您希望跨越多次调用minify（）缓存损坏的变量和属性名称，则传递一个空对象{}或先前使用的nameCache对象。
        //          * 注意：这是一个读/写属性。 minify（）将读取此对象的名称缓存状态并在缩小过程中对其进行更新，以便它可以被重用或由用户外部保留。
        //          */
        //         // nameCache: null,
        //         /**
        //          * ie8（默认为false） - 设置为true以支持IE8
        //          */
        //         ie8: false,
        //         /**
        //          * keep_classnames（默认值：undefined） - 传递true以防止丢弃或改变类名称
        //          */
        //         keep_classnames: true,
        //         /**
        //          * keep_fnames（默认值：false） - 传递true以防止丢弃或改变函数名称。用于依赖于Function.prototype.name的代码。
        //          * 如果最高级别minify选项keep_classnames未定义，则它将被顶级最小化选项keep_fnames的值覆盖。
        //          */
        //         keep_fnames: true,
        //         /**
        //          * safari10（默认：false） - 传递true以解决Safari 10/11 bug循环范围和等待问题。有关详情，请参阅mangle和输出中的safari10选项。
        //          */
        //         safari10: false,
        //     },
        //     /**
        //      * sourceMap（默认为false） - 如果您希望指定源地图选项，则传递一个对象。
        //      */
        //     sourceMap: false
        // })
    ]
};


module.exports = config;
