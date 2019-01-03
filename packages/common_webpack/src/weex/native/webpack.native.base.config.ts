import * as webpack from "webpack";
import * as path from "path";
import entry from "./GetNativePackViews";
import WeexPackConfig from "./WeexPackConfig";
import babelLoader from "../../loader/BabelLoader";
import awesomeTypescriptLoader from "../../loader/TypescriptLoader";
import {getThemeConfig} from "../../style/ThemeConfig";
import {pathAlias} from "../../config/CommonpPathAlias";
const babel7Options =require( "../../../babel/babelrc7");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const {IMAGE_PATH, ANDROID_DIR, IOS_DIR, PROJECT_ROOT_DIR} = WeexPackConfig;

const nativeRelease = process.env.NATIVE_RELEASE ? process.env.NATIVE_RELEASE : false;

/**
 * weex 打包的 base config
 * @author wxup
 * @create 2018-09-22 15:02
 **/

const config: webpack.Configuration = {
    entry,
    output: {
        path: nativeRelease ? path.resolve("./") : path.resolve("./dist"),
        filename: '[name].js',
    },
    resolve: {
        extensions: [".ts", ".tsx", "d.ts", ".js", ".vue", ".css", ".scss", ".less", ".png", "jpg", ".jpeg", ".gif"],
        alias:pathAlias
    },
    node: {
        global: true
    },

    module: {
        rules: [
            babelLoader,
            awesomeTypescriptLoader,
            {
                test: /\.vue(\?[^?]+)?$/,
                loaders: [
                    {
                        loader: "weex-vue-loader",
                        options: {
                            babel: {
                                //support babel7
                                query: babel7Options
                            },
                            loaders: {

                                //覆盖默认的 less-loader，必须要配置成数组，否则不生效
                                less: [
                                    {
                                        loader: 'less-loader',
                                        options: {
                                            sourceMap: true,
                                            javascriptEnabled: true,
                                            modifyVars: getThemeConfig()
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
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
        verbose: true,        　　　　　　　　　　//开启在控制台输出信息
        dry: false        　　　　　　　　　　//启用删除文件
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
    let from = path.join(PROJECT_ROOT_DIR, IMAGE_PATH);
    if (nativeRelease.indexOf("ANDROID") >= 0) {
        config.plugins.push(
            new CopyWebpackPlugin([{
                from: from,
                to: path.join(PROJECT_ROOT_DIR, ANDROID_DIR, IMAGE_PATH)
            }])
        );
    }
    if (nativeRelease.indexOf("IOS") >= 0) {
        config.plugins.push(
            new CopyWebpackPlugin([{
                from: from,
                to: path.join(PROJECT_ROOT_DIR, IOS_DIR, IMAGE_PATH)
            }])
        );
    }
}

export default config;

