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
}

export interface LetterPigeonConfigOptions {

    AccessId: string;

    AccessKey: string;

    Env: string;
}