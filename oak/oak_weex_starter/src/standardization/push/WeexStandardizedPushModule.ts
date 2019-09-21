import {WeexStandardizedModule} from "fengwuxp_common_weex/src/sdk/standardization/WeexStandardizedModule";
import {LetterPigeonConfigOptions, PushConfigOptions, PushMessageInfo, WeexPushModule} from "../../module/push";
import AppRouterHelper from "weex_starter/src/route/AppRouterHelper";
import {parse} from "querystring";
import {broadcast, common} from "../../ExpotrtWeexOAKModel";
import StringUtils from "fengwuxp_common_utils/src/string/StringUtils";


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
export type ReceiveMessageHandle<T extends ReceiveMessageInfo = ReceiveMessageInfo> = (message: T) => HandleMessageResult | boolean | void;

/**
 * weex 标准化推送模块
 */
export interface WeexStandardizedPushModule extends WeexStandardizedModule {
    /**
     * 配置推送的参数
     * @param config
     */
    readonly  config: <T extends PushConfigOptions>(config: T) => void;


    /**
     * 注册接受消息的账号
     * @param accountId
     */
    readonly registerReceiver: (accountId: number | string) => Promise<void>;

    /**
     * 接收信鸽消息，全局只要调用一次，比如在首页（常驻存活的页面）
     * @param handle 可不传，将使用默认的处理方式
     */
    readonly onReceiveMessage: (handle: ReceiveMessageHandle) => void;

    /**
     * 信鸽消息被点击消息
     * @param handle
     */
    readonly onClickMessage: (handle?: ReceiveMessageHandle) => void;

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
export const CLICK_MSG_PREFIX = "onClick_";

/**
 * 未被点击的消息id前缀
 * @type {string}
 */
export const COMMON_MSG_PREFIX = "onText_";

/**
 * 当前显示的消息
 */
export const ON_SHOW_PREFIX = "onShow_";


/**
 * 查找当前被点击的消息
 * @param list
 */
export const findCurrentClickMessage = (list: PushMessageInfo[]) => {
    return list.find((item) => {
        return item.id.indexOf(CLICK_MSG_PREFIX) >= 0;
    });
};

/**
 * 默认的消息接受处理者
 * @param data
 * @param id
 */
export const defaultReceiveMessage: ReceiveMessageHandle = ({data, id}) => {
    const {view, param} = data;

    if (view) {
        AppRouterHelper.toView(view, {
            queryParams: param ? parse(param) : {}
        });
    }
    return true;
};


/**
 * 获取标准化的推送配置
 * @param weexPushModule
 */
export const getStandardizedPushModuleOptions = (weexPushModule: WeexPushModule) => {

    return {
        module: weexPushModule,
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
                broadcast.register("PUSH_MSG_CATEGORY", "NEW_PUSH_MSG", ({data}: { data: ReceiveMessageInfo[] }) => {
                    if (data == null) {
                        return;
                    }
                    if (data.constructor !== Array) {
                        data = [data as any];
                    }
                    const messageInfo = data.find(({id}) => id.startsWith(ON_SHOW_PREFIX));
                    if (messageInfo) {
                        let r = handle(messageInfo);
                        if (r) {
                            weexPushModule.readMsg(messageInfo.id, () => {
                            });
                        }
                    }
                });
            },

            onClickMessage(standardizedModule: WeexStandardizedModule, handle: ReceiveMessageHandle = defaultReceiveMessage) {


                //注册页面显示的回调
                common.setOnActCallback(() => {
                    weexPushModule.queryMsg((list: PushMessageInfo[]) => {
                        if (typeof list === "string") {
                            //手动转换一次
                            list = JSON.parse(list as string);
                        }
                        if (list.length === 0) {
                            return;
                        }
                        const message: PushMessageInfo = findCurrentClickMessage(list);
                        if (message == null) {
                            return;
                        }

                        const messageId = message.id;
                        if (!StringUtils.hasText(message.data)) {
                            console.log("信鸽消息data为空");
                            return;
                        }
                        const data = JSON.parse(message.data);
                        const result = handle({
                            data,
                            id: messageId
                        });

                        if (result) {
                            weexPushModule.readMsg(messageId.toString(), () => {
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
                    weexPushModule.registerMsgPush(id, resolve, reject);
                });
            },

            getAllPushMessages(standardizedModule: WeexStandardizedModule) {
                return new Promise((resolve) => {
                    weexPushModule.queryMsg(resolve);
                });
            },

            readMessageById(standardizedModule: WeexStandardizedModule, messageId: string) {
                return new Promise((resolve) => {
                    weexPushModule.readMsg(messageId, resolve);
                });
            }


        }

    }
};
