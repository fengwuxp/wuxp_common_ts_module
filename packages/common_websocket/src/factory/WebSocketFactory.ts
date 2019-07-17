import {WebSocketAdapter, WebSocketOptions} from "../adapter/WebSocketAdapter";
import {RUN_ENV} from "fengwuxp_common_env/src/EnvVariable";
import {RunEnv} from "../../../common_env/src/enums/RunEnv";
import {WebSocketLifeCycleHandler} from "../core/WebSocketLifeCycleHandler";

type WebSocketAdapterClazz = WebSocketAdapter;

/**
 * web socket 工厂
 */
export default class WebSocketFactory {


    /**
     * 返回一个web socket的适配器
     * @param options        web socket 连接配置
     * @param handler        web socket 生命周期处理者
     */
    public static factory = (options: WebSocketOptions, handler: WebSocketLifeCycleHandler): WebSocketAdapter => {

        //WebSocketAdapter类
        let WebSocketAdapterClazz: WebSocketAdapterClazz;

        switch (RUN_ENV) {
            case RunEnv.WEB:
                WebSocketAdapterClazz = require("../adapter/web/BrowserWebSocketAdapter");
                break;
            case RunEnv.WEEX:
                WebSocketAdapterClazz = require("../adapter/weex/WeexWebSocketAdapter");
                break;
            case RunEnv.WX_MIN_AAPP:
                WebSocketAdapterClazz = require("../adapter/wxminapp/WxMinAppWebSocketAdapter");
                break;
        }

        return new (WebSocketAdapterClazz as any)(options, handler);

    }
}