import {isWeb} from "fengwuxp_common_weex/src/constant/WeexEnv";
import {MiPushConfigOptions, PushMessageInfo, WeexMiPushModule} from "./index";


/**
 * 小米推送
 */
if (isWeb) {
    const msgMiPush: WeexMiPushModule = {
        clearNotification(callback: () => void) {
        },
        config(configOptions: MiPushConfigOptions) {
        },
        getRegId(callback: () => void) {
        },
        queryMsg(callback: (massageList: PushMessageInfo[]) => void) {
        },
        readMsg(messageId: string, callback: (massage: PushMessageInfo) => void) {
        },
        registerMsgPush(accountId: string,
                        success: (data: string) => void,
                        failure: (errorMessage: string) => void) {
        },
        setAcceptTime(startHour: number, startMin: number, endHour: number, endMin: number) {
        },
        setAlias(alias: string) {
        },
        setConfig(accessId: number, accessKey: string) {
        },
        subscribe(topic: string, success: (topic: string) => void, failure: () => void) {
        },
        unsetAlias(alias: string) {
        },
        unsubscribe(topic: string, success: (topic: string) => void, failure: () => void) {
        }


    };
    console.log("注册自定义模块 msgMiPush");
    console.log(msgMiPush);
    weex.registerModule('msgMiPush', msgMiPush);
}
