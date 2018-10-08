"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var GetNativePackViews_1 = require("./GetNativePackViews");
var WeexPackConfig_1 = require("./WeexPackConfig");
var BabelLoader_1 = require("../../loader/BabelLoader");
var TypescriptLoader_1 = require("../../loader/TypescriptLoader");
var CoverThemeLessLoader_1 = require("../../style/CoverThemeLessLoader");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var IMAGE_PATH = WeexPackConfig_1.default.IMAGE_PATH, ANDROID_DIR = WeexPackConfig_1.default.ANDROID_DIR, IOS_DIR = WeexPackConfig_1.default.IOS_DIR, PROJECT_ROOT_DIR = WeexPackConfig_1.default.PROJECT_ROOT_DIR;
var nativeRelease = process.env.NATIVE_RELEASE ? process.env.NATIVE_RELEASE : false;
/**
 * weex 打包的 base config
 * @author wxup
 * @create 2018-09-22 15:02
 **/
var config = {
    entry: GetNativePackViews_1.default,
    output: {
        path: nativeRelease ? path.resolve("./") : path.resolve("./dist"),
        filename: '[name].js',
    },
    resolve: {
        extensions: [".ts", ".tsx", "d.ts", ".js", ".css", ".vue"]
    },
    node: {
        global: true
    },
    module: {
        rules: [
            BabelLoader_1.default,
            TypescriptLoader_1.default,
            {
                test: /\.vue(\?[^?]+)?$/,
                loaders: [
                    {
                        loader: "weex-loader",
                        options: {}
                    }
                ]
            },
            CoverThemeLessLoader_1.default()
        ]
    },
    plugins: []
};
if (nativeRelease) {
    //先将打包目录清除
    config.plugins.push(new CleanWebpackPlugin([
        path.join(PROJECT_ROOT_DIR, ANDROID_DIR),
        path.join(PROJECT_ROOT_DIR, IOS_DIR)
    ], {
        //root: __dirname,       　　　　　　　　　　//根目录
        verbose: true,
        dry: false //启用删除文件
    }));
    //发布的情况下使用copy-webpack-plugiins进行文件复制
    // from    定义要拷贝的源目录           from: __dirname + ‘/src/public’
    // to      定义要拷贝到的目标目录     from: __dirname + ‘/dist’
    // toType  file 或者 dir         可选，默认是文件
    // force   强制覆盖先前的插件           可选 默认false
    // context                         可选 默认base context可用specific context
    // flatten 只拷贝文件不管文件夹      默认是false
    // ignore  忽略拷贝指定的文件           可以用模糊匹配
    //将图片资源复制到对应的原始目录
    var from = path.join(PROJECT_ROOT_DIR, IMAGE_PATH);
    if (nativeRelease.indexOf("ANDROID") >= 0) {
        config.plugins.push(new CopyWebpackPlugin([{
                from: from,
                to: path.join(PROJECT_ROOT_DIR, ANDROID_DIR, IMAGE_PATH)
            }]));
    }
    if (nativeRelease.indexOf("IOS") >= 0) {
        config.plugins.push(new CopyWebpackPlugin([{
                from: from,
                to: path.join(PROJECT_ROOT_DIR, IOS_DIR, IMAGE_PATH)
            }]));
    }
}
exports.default = config;
