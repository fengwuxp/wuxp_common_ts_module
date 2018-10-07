import {ComponentOptions} from "vue";


/**
 * 自动注册发送广播的mixin
 * 依赖props中的sendBroadcastMessage属性
 */
const sendBroadcast: ComponentOptions<any> = {

    mounted(){
        const sendBroadcastMessage = this.sendBroadcastMessage;

    }
};

export default sendBroadcast;
