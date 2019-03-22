import {SharePlatformType} from "./enums/SharePlatformType";


/**
 * share sdk 分享模块
 * @link {http://wiki.mob.com/%E4%B8%8D%E5%90%8C%E5%B9%B3%E5%8F%B0%E5%88%86%E4%BA%AB%E5%86%85%E5%AE%B9%E7%9A%84%E8%AF%A6%E7%BB%86%E8%AF%B4%E6%98%8E/}
 */

export interface WeexMobShareModule {


    /**
     * 初始化配置
     * @param appKey
     * @param appSecret
     */
    initConfig: (appKey: string, appSecret: string) => void;

    /**
     * 分享
     * @param platform
     * @param options
     * @param success
     * @param failure
     */
    shareSignPlatform<T extends BasShareOptions>(platform: SharePlatformType,
                                                 options: T,
                                                 success: (messaeg: string) => void,
                                                 failure: (messaeg: string) => void): void;
}

export interface BasShareOptions {

    /**
     * 标题
     */
    title: string,

    /**
     * 文本
     */
    text: string,

    /**
     * 图片url
     */
    imageUrl: string
}

export interface WeChatOptions extends BasShareOptions {

    /**
     * 站点url
     */
    url: string
}

export interface QQOptions extends BasShareOptions {

    /**
     * 站点url
     */
    titleUrl: string,
}