import {LetterPigeonConfigOptions, PushMessageInfo, WeexLetterPigeonPushModule} from "../../module/push";
import {standardizedWeexModuleToPromise} from "common_weex/src/sdk/standardization/StandardizationHelper";
import {msgPush, common} from "../../ExpotrtWeexOAKModel";
import {WeexStandardizedModule} from "common_weex/src/sdk/standardization/WeexStandardizedModule";
import {parse} from "querystring";
import AppRouterHelper from "weex_starter/src/route/AppRouterHelper";

/**
 * 消息处理的结果
 */
interface HandleMessageResult {


}

/**
 * 接受的消息对象
 */
export interface ReceiveMessageInfo {

    id: string;

    data: {
        /**
         * 跳转路径
         */
        view: string;

        /**
         * 跳转参数，格式默认为查询字符串 q=1&b=2
         */
        param: string;
    }

}

/**
 * 接收消息处理
 */
type ReceiveMessageHandle<T extends ReceiveMessageInfo = ReceiveMessageInfo> = (message: T) => HandleMessageResult | boolean | void;

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
     * @param handle 可不传，将使用默认的处理方式
     */
    readonly  onReceiveMessage: (handle?: ReceiveMessageHandle) => void;


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

/**
 * 被点击的消息id前缀
 * @type {string}
 */
const CLICK_MSG_PREFIX = "onClick_";

/**
 * 未被点击的消息id前缀
 * @type {string}
 */
const COMMON_MSG_PREFIX = "onText_";


/**
 * 查找当前被点击的消息
 * @param list
 */
const findCurrentClickMessage = (list: PushMessageInfo[]) => {
    return list.find((item) => {
        return item.id.indexOf(CLICK_MSG_PREFIX) >= 0;
    });
};

/**
 * 默认的消息接受处理者
 * @param data
 * @param id
 */
const defaultReceiveMessage: ReceiveMessageHandle = ({data, id}) => {
    const {view, param} = data;

    if (view) {
        AppRouterHelper.toView(view, {
            queryParams: param ? parse(param) : {}
        });
    }
    return true;
};

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
        onReceiveMessage(standardizedModule: WeexStandardizedModule, handle: ReceiveMessageHandle = defaultReceiveMessage) {


            //注册页面显示的回调
            common.setOnActCallback(() => {
                msgPush.queryMsg((list: PushMessageInfo[]) => {
                    if (typeof list === "string") {
                        //手动转换一次
                        list = JSON.parse(list as string);
                    }
                    if (list.length === 0) {
                        return;
                    }
                    const message: PushMessageInfo = findCurrentClickMessage(list);
                    if (message === null || message === undefined) {
                        return;
                    }

                    const messageId = message.id;
                    const data = JSON.parse(message.data);
                    const result = handle({
                        data,
                        id: messageId
                    });

                    if (result) {
                        msgPush.readMsg(messageId.toString(), () => {
                            console.log("消息读取成功!");
                        });
                    }
                });
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