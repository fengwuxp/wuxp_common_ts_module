/**
 * 推送接口
 */
export interface WeexPushModule {
    /**
     * 注册推送
     * @param accountId
     * @param success
     * @param failure
     */
    registerMsgPush: (accountId: string,
                      success: (data: string) => void,
                      failure: (errorMessage: string) => void) => void;

    /**
     * 设置信鸽配置
     * @param config
     */
    config: <T extends PushConfigOptions>(config: T) => void;

    /**
     * 设置配置
     * @param accessId
     * @param accessKey
     */
    setConfig: (accessId: number, accessKey: string) => void;


    /**
     * 查询消息
     */
    queryMsg: (callback: (massageList: PushMessageInfo[]) => void) => void;

    /**
     * 根据id读取消息
     * @param messageId
     * @param callback
     */
    readMsg: (messageId: string, callback: (massage: PushMessageInfo) => void) => void;
}


export interface PushConfigOptions {

    AccessId: number | string;
    AccessKey: string;

}

export interface LetterPigeonConfigOptions extends PushConfigOptions {

    Env?: string;
}

/**
 * 信鸽 推送
 */
export interface WeexLetterPigeonPushModule extends WeexPushModule {


}


export interface PushMessageInfo {

    /**
     * 消息
     */
    id: string;

    //消息标题
    title: string;

    //消息描述
    desc: string;

    //消息图标
    icon: string;

    //时间，格式 毫秒数
    datetime: string;

    //一般是json数据
    data: string;
}


/**
 * 小米推送
 */
export interface WeexMiPushModule extends WeexPushModule {
    /**
     * 设置小米推送置
     * @param config
     */
    config: (config: MiPushConfigOptions) => void;

    /**
     * 设置配置
     * @param accessId
     * @param accessKey
     */
    setConfig: (accessId: number, accessKey: string) => void;

    /**
     * 订阅主题
     * @param topic
     * @param success
     * @param failure
     */
    subscribe: (topic: string, success: (topic: string) => void, failure: () => void) => void;

    /**
     * 取消订阅
     * @param topic
     * @param success
     * @param failure
     */
    unsubscribe: (topic: string, success: (topic: string) => void, failure: () => void) => void;

    setAlias: (alias: string) => void;

    unsetAlias: (alias: string) => void;

    /**
     * 设置接收时段
     * @param startHour
     * @param startMin
     * @param endHour
     * @param endMin
     */
    setAcceptTime: (startHour: number, startMin: number, endHour: number, endMin: number) => void;

    /**
     * 清楚通知
     * @param callback
     */
    clearNotification: (callback?: () => void) => void;

    getRegId: (callback: () => void) => void;

}

export interface MiPushConfigOptions extends PushConfigOptions {

    // accessId?: number;
    // accessKey?: string;

    AppID?: string;
    AppKey?: string;
}
