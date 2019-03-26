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
export interface WeexStandardizeLetterPigeonPushModule extends WeexStandardizedModule {


    /**
     * 配置信鸽推送的参数
     * @param config
     */
    readonly  config: (config: LetterPigeonConfigOptions) => void;


    /**
     * 注册接受消息的账号
     * @param accountId
     */
    readonly registerReceiver: (accountId: number | string) => Promise<void>;

    /**
     * 接收信鸽消息，全局只要调用一次，比如在首页（常驻存活的页面）
     * @param handle
     */
    readonly  onReceiveMessage: (handle: ReceiveMessageHandle) => void;


    /**
     * 获取所有的推送消息
     */
    readonly getAllPushMessages: () => Promise<PushMessageInfo[]>;

    /**
     * 通过消息id读取消息
     * @param id
     */
    readonly readMessageById: (id: string) => Promise<PushMessageInfo>;
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
            let id: string = accountId.toString();
            if ((typeof accountId === "number" && accountId < 10) || id.length === 1) {
                id = `0${accountId}`;
            }
            return new Promise((resolve, reject) => {
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