import {RuleSetRule} from "webpack";

export enum OutputType {

    dev,

    prod,

    release
}

/**
 * 获取webpack基础配置的options
 * @author wxup
 * @create 2018-09-07 21:33
 **/
export interface GetWebpackBaseConfigOptions {

    /**
     * 样式json文件所在路径
     */
    themePath?: string

    /**
     * packageJson的文件路径
     */
    packagePath?: string;

    /**
     * awesomeTypescriptLoader
     */
    awesomeTypescriptLoader?: RuleSetRule;

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


}
