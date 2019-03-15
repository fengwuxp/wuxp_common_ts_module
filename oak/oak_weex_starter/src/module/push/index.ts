/**
 * 信鸽 推送
 */
export interface WeexLetterPigeonPushModule {


    /**
     * 设置信鸽配置
     * @param config
     */
    config: (config: LetterPigeonConfigOptions) => void;

    /**
     * 注册信鸽推送
     * @param accountId
     * @param success
     * @param failure
     */
    registerMsgPush: (accountId: string,
                      success: (data) => void,
                      failure: (errorMessage: string) => void) => void;

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

export interface LetterPigeonConfigOptions {

    AccessId: string;

    AccessKey: string;

    Env: string;
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