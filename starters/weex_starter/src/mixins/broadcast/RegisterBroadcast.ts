import {ComponentOptions} from "vue";
import StringUtils from "../../../../../packages/common_utils/src/string/StringUtils";

/**
 * 常用的广播事件分类
 */
export enum BroadcastViewEventType {

    /**
     * 刷新
     */
    REFRESH,

    /**
     * 选中
     */
    SELECTED,

    /**
     * 删除
     */
    DELETED
}

/**
 * 页面广播事件定义
 */
interface BroadcastViewEvent {

    /**
     * 事件分类
     */
    category: BroadcastViewEventType | string;

    /**
     * 事件名称
     */
    eventName: string;

    success: (data: any) => void;

    error?: (data: any) => void;
}

/**
 * 自动注册广播的mixin
 * 依赖 props中的 onBroadcastMessage 属性
 */
const registerBroadcast: ComponentOptions<any> = {

    mounted() {
        const events: Array<BroadcastViewEvent> = [];

        const onBroadcastMessage = this.onBroadcastMessage;
        for (const key in onBroadcastMessage) {
            const event: Object = onBroadcastMessage[key];
            for (const eventName in event) {
                const category = key;//.toString().toUpperCase();

                events.push({
                    category,
                    eventName,
                    success: event[eventName]
                });
            }
        }
        //注册广播事件
        registerBroadcastEvents.apply(this, [events]);
    }
};

//广播模块
const broadcast = weex.requireModule("broadcast");

/**
 * 注册广播事件
 * @param events
 */
function registerBroadcastEvents(events: Array<BroadcastViewEvent>) {
    events.forEach(({category, eventName, success}: BroadcastViewEvent) => {
        console.log("-注册广播事件->" + category + " " + eventName);
        broadcast.register(category, eventName, ({data}) => {
            if (StringUtils.isJSONString(data)) {
                data = JSON.parse(data);
            }
            success.apply(this, [data]);
        });
    });
}

export default registerBroadcast;
