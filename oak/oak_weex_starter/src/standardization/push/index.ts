import {PushConfigOptions} from "../../module/push";
import weexStandardizeLetterPigeonPushModule from "./WeexStandardizeLetterPigeonPushModule";
import weexStandardizeMiPushModule from "./WeexStandardizeMiPushModule";
import {PushModel, WeexStandardizedPushModule} from "./WeexStandardizedPushModule";





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
    const isLetter = pushModel == PushModel.LETTER_PIGEON;
    const standardizeLetterPushModule:WeexStandardizedPushModule = isLetter ? weexStandardizeMiPushModule : weexStandardizeLetterPigeonPushModule;
    standardizeLetterPushModule.config(options);
    return standardizeLetterPushModule.registerReceiver(accountId);
};
