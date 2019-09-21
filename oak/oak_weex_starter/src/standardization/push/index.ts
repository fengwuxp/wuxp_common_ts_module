import {PushConfigOptions} from "../../module/push";
import weexStandardizeLetterPigeonPushModule from "./WeexStandardizeLetterPigeonPushModule";
import weexStandardizeMiPushModule from "./WeexStandardizeMiPushModule";
import {WeexStandardizedPushModule} from "./WeexStandardizedPushModule";


/**
 * 推送模式
 */
export enum PushModel {

    /**
     * 信鸽
     */
    LETTER_PIGEON,

    /**
     * 小米推送
     */
    MI
}


/**
 * 注册消息推送接收账号
 * @param accountId  用户id
 * @param pushModel  推送模式
 * @param options    推送配置  默认使用小米推送
 * @return Promise<void>
 */
export const registerMessageReceiverAccount = <T extends PushConfigOptions>(accountId: number | string,
                                                             options: T,
                                                             pushModel: PushModel = PushModel.MI): Promise<void> => {

    const standardizeLetterPushModule:WeexStandardizedPushModule = pushModel == PushModel.MI ? weexStandardizeMiPushModule : weexStandardizeLetterPigeonPushModule;
    standardizeLetterPushModule.config(options);
    return standardizeLetterPushModule.registerReceiver(accountId);
};
