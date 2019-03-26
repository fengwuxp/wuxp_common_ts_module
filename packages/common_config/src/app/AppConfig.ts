import {LayoutConfig} from "../views/LayoutConfig";

// @ts-ignore
import {FeignProxyInitializer} from "common_fetch/src/proxy/feign/FeignProxyInitializer";


/**
 * app的配置
 * @author wxup
 * @create 2018-09-27 9:58
 **/
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
     * 远程静态资源的根路径，如果没有则使用apiEntryAddress
     */
    staticResourcesRootPath?: string;

    /**
     * 文件上传地址
     */
    uploadFileURL?: string;

    /**
     * 布局配置
     */
    layoutConfig: LayoutConfig;


    /**
     * androidAppCode 检查更新需要
     */
    androidAppCode: string;

    /**
     * feign proxy 的初始化器
     */
    feignProxyInitializer?: FeignProxyInitializer;
}
