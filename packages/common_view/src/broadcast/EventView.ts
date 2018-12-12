import {ReceiveMessageView} from "./ReceiveMessageView";
import {SendMessageView} from "./SendMessageView";

/**
 * 支持订阅发布事件的视图
 */
export interface EventView extends ReceiveMessageView,SendMessageView{

}