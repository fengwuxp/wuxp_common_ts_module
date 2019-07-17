import {
    NetworkStatusListener,
    NetworkStatus,
    NoneNetworkFailBack
} from "fengwuxp_common_fetch/src/interceptor/default/NeedNetworkInterceptor";
import TaroJsHolder from "taro_starter/src/TaroJsHolder";


/**
 * 网络状态监听者
 */
export class OAKTaroNetworkListener implements NetworkStatusListener {


    constructor() {
    }

    initNetworkStatus = (): Promise<NetworkStatus> => {

        return TaroJsHolder.getTaroHolder().taro.getNetworkType().then(({networkType}) => {
            if (networkType == null || networkType === "none") {
                return Promise.reject(null)
            } else {
                return {
                    networkType,
                    isConnected: true
                };
            }
        })
    };

    onChange = (callback: (networkStatus: NetworkStatus) => void): void => {

        TaroJsHolder.getTaroHolder().taro.onNetworkStatusChange(({isConnected, networkType}) => {
            callback({
                networkType,
                isConnected
            } as NetworkStatus)
        })
    }


}

export class OakTaroNoneNetworkFailBack implements NoneNetworkFailBack {

    handle = () => {
        TaroJsHolder.getTaroHolder().taro.showToast({
            title: "网络未连接哦~",
            icon: 'none',
            mask: true
        });
    };
}