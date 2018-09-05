const path = require('path');
const webpack = require('webpack');
const {getWebpackBaseConfig} = require("./webpack.base.config");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;


const baseConfig = getWebpackBaseConfig({
    themePath: path.resolve("theme", "index.json")
});


const config = {
    ...baseConfig,
};

config.plugins = [
    ...config.plugins,
    new webpack.optimize.CommonsChunkPlugin({
        name: "common",
        minChunks: function (module) {
            // this assumes your vendor imports exist in the node_modules directory
            return module.context && module.context.includes("node_modules");
        }
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
    new ExtractTextPlugin('styles.css'),

];


module.exports = config;
