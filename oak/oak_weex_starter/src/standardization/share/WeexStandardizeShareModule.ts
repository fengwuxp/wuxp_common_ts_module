import {standardizedWeexModuleToPromise} from "common_weex/src/sdk/standardization/StandardizationHelper";
import {WeexStandardizedModule} from "common_weex/src/sdk/standardization/WeexStandardizedModule";
import {SharePlatformType} from "../../module/share/enums/SharePlatformType";
import {WeexMobShareModule} from "../../module/share";


/**
 * 标准化的分享能
 */
export interface WeexStandardizeShareModule extends WeexStandardizedModule {


    /**
     * 初始化配置
     * @param appKey
     * @param appSecret
     */
    readonly  initConfig: (appKey: string, appSecret: string) => void;

    /**
     * 分享
     * @param options
     */
    readonly  shareByMob: (options: ShareOptions) => Promise<void>;
}

export interface ShareOptions {


    //分享的平台类型
    platform: SharePlatformType;

    //标题
    title: string;

    //文本内容
    text?: string;

    //url
    url?: string;

    //图片
    image?: string;

}

/**
 * 构建分享参数
 * @type {{wechat: function(), qQShare: function(), qQZone: function()}}
 */
const SHARE_PARAMS_BUILDER = {

    /**
     * 微信分享
     */
    Wechat: ({title, image, text, url}) => {

        return {
            title,
            text,
            url,
            imageUrl: image
        }
    },

    /**
     * 微信朋友圈
     * @constructor
     */
    WechatMoments: (data) => SHARE_PARAMS_BUILDER.Wechat(data),

    /**
     * QQ分享
     */
    QQ: ({title, image, text, url}) => {
        return {
            title,
            titleUrl: url,
            imageUrl: image,
            text
        };
    },

    /**
     * QQ空间分享
     */
    QZone: (data) => SHARE_PARAMS_BUILDER.QQ(data)
};


const module: WeexMobShareModule = weex.requireModule("share"), _proxyModule: WeexMobShareModule = {...module} as any;

const hasInitFunction = typeof module.initConfig === "function";

if (!hasInitFunction) {
    _proxyModule.initConfig = function (appKey: string, appSecret: string) {
    }

}

const weexStandardizeShareModule = standardizedWeexModuleToPromise<WeexStandardizeShareModule>({
    module: hasInitFunction ? module : _proxyModule,
    transformParamMap: {},
    transformCallbackMap: {
        initConfig: (resolve, reject) => []
    },
    enhanceMap: {
        shareByMob: (weexStandardizedModule: WeexMobShareModule, shareOptions: ShareOptions) => {
            return new Promise((resolve, reject) => {
                const platform = shareOptions.platform;
                module.shareSignPlatform(
                    platform,
                    SHARE_PARAMS_BUILDER[platform](shareOptions),
                    resolve, reject);
            });
        }
    },
});

export default weexStandardizeShareModule