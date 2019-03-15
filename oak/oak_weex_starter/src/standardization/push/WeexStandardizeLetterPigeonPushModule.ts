import {LetterPigeonConfigOptions, PushMessageInfo, WeexLetterPigeonPushModule} from "../../module/push";
import {standardizedWeexModuleToPromise} from "common_weex/src/sdk/standardization/StandardizationHelper";
import {msgPush, broadcast} from "../../ExpotrtWeexOAKModel";
import {WeexStandardizedModule} from "common_weex/src/sdk/standardization/WeexStandardizedModule";

/**
 * 消息处理的结果
 */
interface HandleMessageResult {

}

/**
 * 接收消息处理
 */
type ReceiveMessageHandle<T = any> = (message: T) => HandleMessageResult | void;

/**
 * 信鸽推送能力标准化
 */
export interface WeexStandardizeLetterPigeonPushModule {


    /**
     * 配置信鸽推送的参数
     * @param config
     */
    config: (config: LetterPigeonConfigOptions) => void;


    /**
     * 注册接受消息的账号
     * @param accountId
     */
    registerReceiver: (accountId: number) => Promise<void>;

    /**
     * 接收信鸽消息，全局只要调用一次，比如在首页（常驻存活的页面）
     * @param handle
     */
    onReceiveMessage: (handle: ReceiveMessageHandle) => void;


    /**
     * 获取所有的推送消息
     */
    getAllPushMessages: () => Promise<PushMessageInfo[]>;

    /**
     * 通过消息id读取消息
     * @param id
     */
    readMessageById: (id: string) => Promise<PushMessageInfo>;
}

const standardizeLetterPigeonPushModule = standardizedWeexModuleToPromise<WeexStandardizeLetterPigeonPushModule>({
    module: msgPush,
    transformParamMap: {
        config: (pigeonConfigOptions: LetterPigeonConfigOptions) => {
            return [
                pigeonConfigOptions
            ];
        }

    },
    transformCallbackMap: {},
    enhanceMap: {
        onReceiveMessage(standardizedModule: WeexStandardizedModule, handle: ReceiveMessageHandle) {
            broadcast.register("PUSH_MSG_CATEGORY", "NEW_PUSH_MSG", (data) => {
                const result = handle(data);
                if (result != null) {
                    //TODO result
                }
            });
        },
        registerReceiver(standardizedModule: WeexStandardizedModule, accountId: number) {
            return new Promise((resolve, reject) => {
                let id: string = accountId.toString();
                if (accountId < 10) {
                    id = `0${accountId}`;
                }
                (standardizedModule as WeexLetterPigeonPushModule).registerMsgPush(id, resolve, reject);
            });
        },

        getAllPushMessages(standardizedModule: WeexStandardizedModule) {
            return new Promise((resolve) => {
                (standardizedModule as WeexLetterPigeonPushModule).queryMsg(resolve);
            });
        },

        readMessageById(standardizedModule: WeexStandardizedModule, messageId: string) {
            return new Promise((resolve) => {
                (standardizedModule as WeexLetterPigeonPushModule).readMsg(messageId, resolve);
            });
        }


    }

});

export default standardizeLetterPigeonPushModule