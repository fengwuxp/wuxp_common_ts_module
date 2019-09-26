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
    const standardizeLetterPushModule = getPushModule(pushModel);
    return standardizeLetterPushModule.config(options).then(() => {
        return standardizeLetterPushModule.registerReceiver(accountId);
    });


    // return new Promise<void>((resolve, reject) => {
    //     const timerId = setTimeout(() => {
    //         if (pushModel === PushModel.MI) {
    //             //20秒后尝试重新注册用户，小米推送首次需要等待应用授权
    //             console.log("重新注册");
    //             standardizeLetterPushModule.registerReceiver(accountId)
    //                 .then(resolve)
    //                 .catch(reject);
    //         }
    //     }, 20 * 1000);
    //
    //     return standardizeLetterPushModule.registerReceiver(accountId).then(() => {
    //         clearTimeout(timerId);
    //         resolve()
    //     }).catch(reject);
    // })
};


/**
 * 获取推送模块
 * @param pushModel
 */
export const getPushModule = (pushModel: PushModel): WeexStandardizedPushModule => {
    const isLetter = pushModel == PushModel.LETTER_PIGEON;
    return isLetter ? weexStandardizeLetterPigeonPushModule : weexStandardizeMiPushModule;
};
