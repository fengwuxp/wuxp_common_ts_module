"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var webpack_base_config_1 = require("./webpack.base.config");
var baseConfig = webpack_base_config_1.getWebpackBaseConfig({
    themePath: path.resolve("theme", "index.json")
});
var config = __assign({}, baseConfig);
config.mode = "production";
config.optimization = {
    splitChunks: {
        cacheGroups: {
            common: {
                chunks: 'initial',
                name: 'common',
                enforce: true // 强制
            }
        }
    }
};
var uglifyJsPlugin = new UglifyJsPlugin({
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
    },
});
config.plugins.push(uglifyJsPlugin);
exports.default = config;
