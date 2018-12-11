/**
 * app的配置
 * @author wxup
 * @create 2018-09-27 9:58
 **/
import {LayoutConfig} from "../views/LayoutConfig";
import {ResourceConfig} from "../resources/ResourceConfig";


export interface AppConfig {

    /**
     * http 协议
     */
    httpProtocol: | "http" | "https";

    /**
     * api入口地址
     */
    apiEntryAddress: string;

    /**
     * 静态资源的根路径，如果没有则使用apiEntryAddress
     */
    staticResourcesRootPath?: string;

    /**
     * 文件上传地址
     */
    upLoadFileURL?: string;

    /**
     * 布局配置
     */
    layoutConfig: LayoutConfig;

    /**
     *资源配置
     */
    resourceConfig: ResourceConfig;


}
