import {NetworkStatusListener, NetworkStatus,NoneNetworkFailBack} from "common_fetch/src/interceptor/default/NeedNetworkInterceptor";
import {weexToast} from "common_weex/src/toast/WeexToast";

const appMain: any = weex.requireModule("appMain");

export class OAKWeexNetworkListener implements NetworkStatusListener {


    constructor() {
    }

    initNetworkStatus = (): Promise<NetworkStatus> => {

        return this.getNetwork();
    };

    onChange = (callback: (networkStatus: NetworkStatus) => void): void => {

        //每隔15秒获取一次网络状态
        setTimeout(() => {
            this.getNetwork().then(callback).catch(() => {
                callback(null);
            });
        }, 15 * 1000);
    };

    private getNetwork = (): Promise<NetworkStatus> => {

        return new Promise<NetworkStatus>((resolve, reject) => {
            appMain.getNetworkType((result) => {
                if (result === 0) {

                    resolve({
                        /**
                         * 当前是否有网络连接
                         */
                        isConnected: true,

                        /**
                         * 网络类型
                         */
                        networkType: null,
                    })
                } else {
                    reject(result);
                }
            });
        })
    }
}


export class OakWeexNoneNetworkFailBack implements NoneNetworkFailBack {

    handle = () => {
        weexToast("网络未连接哦~");
    };
}