import {ComponentOptions} from "vue";
import {broadcast} from "../../ExpotrtWeexOAKModel";
import {R_CATEGORY, R_EVENT_NAME} from "../../constant/EventParamKey";
import StringUtils from "common_utils/src/string/StringUtils";

//固定广播方法名称
const sendBroadcastName: string = "sendAutoCreateBroadcastName";

/**
 * 创建发送广播的函数
 * @param {string}category
 * @param {string}eventName
 * @return {Function}
 */
const createSendFunction = (category: string, eventName: string): Function => {
    return function (data: any) {
        broadcast.send(category, eventName, data);
    }
};

/**
 * 自动注册发送广播的mixin
 * 依赖props中的sendBroadcastMessage属性
 */
const sendBroadcast: ComponentOptions<any> = {


    data() {
        return {

        }
    },
    methods: {
        /**
         * 发送来自外部调用自动生成的广播名称生成的广播事件
         * @return {string}
         */
        sendAutoCreateBroadcastEvent(data: any): string {
            if (this[sendBroadcastName] == null) {
                return;
            }
            return this[sendBroadcastName](data);
        }
    },
    mounted() {
        const sendMessage: Array<Object> = this.sendMessage;

        //生成方法
        for (const category in sendMessage) {
            const event: Object = sendMessage[category];
            for (const eventName in event) {
                const item = event[eventName];
                let fnName: string = "";
                if (typeof item === "function") {
                    fnName = item();
                } else {
                    fnName = category + "_" + eventName;
                }
                console.log("在页面上注册事件-> " + fnName);
                this[fnName] = createSendFunction(category, eventName);
            }
        }

        this.$nextTick(() => {
            const sendCategory = this[R_CATEGORY];
            const sendEventName = this[R_EVENT_NAME];
            if (StringUtils.hasText(sendCategory) && StringUtils.hasText(sendEventName)) {
                //注册来自外部的传入的广播名称
                this.sendMessage[sendCategory] = {};
                this.sendMessage[sendCategory][sendEventName] = () => {
                    return sendBroadcastName;
                };
            }
        });
    }
};

export default sendBroadcast;
