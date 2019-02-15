import {PlatformType} from "./PlatformType";


/**
 *客户端版本信息
 **/
export interface AppVersionInfo {
    /**
     * 应用名称
     */
    name: string;
    /**
     * ID
     */
    id: number;
    /**
     * 显示版本
     */
    version: string;
    /**
     * 版本号
     */
    code: number;
    /**
     * 更新URL
     */
    url: string;
    /**
     * 更新说明
     */
    note: string;
    /**
     *
     */
    platformTypeDesc: string;
    /**
     * 应用编码
     */
    appCode: string;
    /**
     * 客户端类型
     */
    platformType: PlatformType;
    /**
     * 强制升级
     */
    forcibly: boolean;
    /**
     * 更新页面的url
     */
    updatePageUrl: string;
    /**
     * 发布日期
     */
    publicTime: Date;
    /**
     * 是否apk下载
     */
    apk: boolean;
}
