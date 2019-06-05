const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                "dx_domain": JSON.stringify("114.118.95.10:10000")
            }
        }),
        new UglifyJsPlugin({
            // parallel: true,
            uglifyOptions: {

                /**
                 * ecma（默认未定义） - 传递5,6,7或8以覆盖分析，压缩和输出选项。。
                 */
                ecma: 5,

                /**
                 * 警告（默认为false） - 通过true返回result.warnings中的压缩机警告。使用值“详细”更详细的警告。
                 */
                warnings: false,

                /**
                 * 解析（默认{}） - 如果您希望指定一些额外的解析选项，则传递一个对象。
                 */
                parse: {},

                /**
                 * compress（默认{}） - 传递false以完全跳过压缩。传递一个对象来指定自定义压缩选项。
                 */
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
                },


                /**
                 * toplevel（默认为false） - 如果您希望启用顶级变量和函数名称修改并删除未使用的变量和函数，则设置为true。
                 */
                toplevel: false,

                /**
                 * nameCache（默认为空） - 如果您希望跨越多次调用minify（）缓存损坏的变量和属性名称，则传递一个空对象{}或先前使用的nameCache对象。
                 * 注意：这是一个读/写属性。 minify（）将读取此对象的名称缓存状态并在缩小过程中对其进行更新，以便它可以被重用或由用户外部保留。
                 */
                // nameCache: null,

                /**
                 * ie8（默认为false） - 设置为true以支持IE8
                 */
                ie8: false,

                /**
                 * keep_classnames（默认值：undefined） - 传递true以防止丢弃或改变类名称
                 */
                keep_classnames: true,

                /**
                 * keep_fnames（默认值：false） - 传递true以防止丢弃或改变函数名称。用于依赖于Function.prototype.name的代码。
                 * 如果最高级别minify选项keep_classnames未定义，则它将被顶级最小化选项keep_fnames的值覆盖。
                 */
                keep_fnames: true,

                /**
                 * safari10（默认：false） - 传递true以解决Safari 10/11 bug循环范围和等待问题。有关详情，请参阅mangle和输出中的safari10选项。
                 */
                safari10: false,
            },

            /**
             * sourceMap（默认为false） - 如果您希望指定源地图选项，则传递一个对象。
             */
            sourceMap: false

        })
    ]
});