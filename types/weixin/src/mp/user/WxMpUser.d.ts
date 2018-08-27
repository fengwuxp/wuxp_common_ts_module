/**
 * 微信用户信息
 * 详情请见: http://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140839&token=&lang=zh_CN
 */
export interface WxMpUser {

    /**
     * 用户是否订阅该公众号标识，值为false时，代表此用户没有关注该公众号，拉取不到其余信息。
     */
    readonly subscribe: boolean;

    /**
     * 用户的标识，对当前公众号唯一
     */
    readonly openId: string;

    /**
     * 用户昵称
     */
    readonly nickname: string;

    /**
     * 用户的性别
     */
    readonly sex: string;


    /**
     * 用户的语言，简体中文为zh_CN
     */
    readonly language: string

    /**
     * 用户所在城市
     */
    readonly city?: string;

    /**
     * 用户所在省份
     */
    readonly province?: string;

    /**
     *    用户所在国家
     */
    readonly country: string

    /**
     *    用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），
     *    用户没有头像时该项为空。
     *    若用户更换头像，原有头像URL将失效。
     */
    readonly headImgUrl?: string;

    /*8
    	用户关注时间，为时间戳。如果用户曾多次关注，则取最后关注时间
     */
    readonly subscribeTime: number;


    /**
     *    只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。
     */
    readonly unionId?: string;

    /**
     * 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
     */
    readonly sexId?: number;

    readonly remark?: string;

    readonly groupId?: number;

    /**
     * 用户被打上的标签ID列表
     */
    readonly tagIds?: number[];


}
