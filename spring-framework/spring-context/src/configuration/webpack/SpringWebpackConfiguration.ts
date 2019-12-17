import HtmlWebPackPlugin from "html-webpack-plugin";
import {Entry, EntryFunc} from "webpack";

export interface SpringWebpackConfiguration {


    /**
     * 入口文件
     * default： {
     *     app:"src/App.tsx"
     * }
     */
    entry?: string | string[] | Entry | EntryFunc;

    /**
     * 静态资源根路径
     * default "./"
     */
    staticResourcesBasePath?: string;

    /**
     * 默认输出目录
     * 相对与 src
     * default "../dist"
     */
    outputPath?: string;


    /**
     * default "/"
     */
    publicPath?: string;

    /**
     * default development
     */
    mode?: "development" | "production" | "none";


    externals?: {
        [K: string]: string
    }

    htmlPlugin?: HtmlWebPackPlugin.Options;
}
