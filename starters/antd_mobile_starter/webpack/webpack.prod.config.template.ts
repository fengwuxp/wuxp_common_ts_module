import * as path from "path";
import * as os from "os";

import {getWebpackBaseConfig} from "common_webpack/scr/web/webpack.base.config";

//多线程压缩插件
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');


const config = getWebpackBaseConfig({
    themePath: path.resolve("theme", "index.json")
});


const baseConfig = {
    ...config,
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        //     "moment": "moment"
    },
};

baseConfig.mode = "production";


baseConfig.optimization = { // 提取js 第三方库等
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
    }
};


// let uglifyJsPlugin = new UglifyJsPlugin({});
baseConfig.plugins.push(
    new UglifyJsParallelPlugin({
        // usually having as many workers as cpu cores gives good results
        workers: os.cpus().length,
        // other uglify options
        parallel: true,
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
             * mangle（默认为true） - 传递false以跳过mangling名称，或传递一个对象以指定mangle选项（请参阅下文）。
             * mangle.properties（默认为false） - mangle选项的子类别。传递一个对象来指定自定义的mangle属性选项。
             * 输出（默认为空） - 如果您希望指定其他输出选项，则传递一个对象。默认值已经过优化以获得最佳压缩效果。
             */
            // mangle:true,

            /**
             * 输出（默认为空） - 如果您希望指定其他输出选项，则传递一个对象。默认值已经过优化以获得最佳压缩效果。
             */
            // output: {
            //     comments: false,
            //     beautify: false,
            //
            // },

            /**
             * sourceMap（默认为false） - 如果您希望指定源地图选项，则传递一个对象。
             */
            sourceMap: false,

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
        }
    })
);

export {
    baseConfig
};
