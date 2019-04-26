import AbstractFetchInterceptor from "../AbstractFetchInterceptor";
import {FetchOptions} from "../../FetchOptions";


/**
 * 需要网络的拦截判断
 */
export default class NeedNetworkInterceptor extends AbstractFetchInterceptor {

    private networkStatusListener: NetworkStatusListener = null;

    private noneNetworkHandler: NoneNetworkFailBack = null;

    private networkStatus: NetworkStatus = null;

    constructor(networkStatusListener: NetworkStatusListener, noneNetworkHandler?: NoneNetworkFailBack = defaultWorkFailBack) {
        super();
        this.networkStatusListener = networkStatusListener;
        this.noneNetworkHandler = noneNetworkHandler;

        this.networkStatusListener.initNetworkStatus().then((networkStatus) => this.networkStatus = networkStatus);
        this.networkStatusListener.onChange((networkStatus) => this.networkStatus = networkStatus);
    }

    preHandle = (params: FetchOptions): Promise<FetchOptions> | FetchOptions | null | undefined => {

        const {networkStatus, noneNetworkHandler} = this;

        if (networkStatus != null && networkStatus.isConnected) {
            return Promise.resolve(params);
        } else {
            //TODO 无网络是堆积请求，网络恢复后在重新请求，默认堆积等待事件 10分钟
            noneNetworkHandler.handle();
            return Promise.reject();
        }

    }


}


/**
 * 无网络时的降级处理
 */
export interface NoneNetworkFailBack {

    handle: () => void
}

const defaultWorkFailBack: NoneNetworkFailBack = {
    handle: () => {
        console.log("none network")
    }
};

/**
 * 网络状态监听者
 */
export interface NetworkStatusListener {


    /**
     * 初始化网络状态
     */
    initNetworkStatus: () => Promise<NetworkStatus>;


    /**
     * 监听网络变化
     */
    onChange: (callback: (networkStatus: NetworkStatus) => void) => void;
}

// wifi	wifi 网络
// 2g	2g 网络
// 3g	3g 网络
// 4g	4g 网络
// unknown	Android 下不常见的网络类型
// none	无网络
export interface NetworkStatus {

    /**
     * 当前是否有网络连接
     */
    isConnected: boolean;

    /**
     * 网络类型
     */
    networkType: NetworkType;
}

export enum NetworkType {

    WIFI = "wifi",

    G_2 = "2g",

    G_3 = "3g",

    G_4 = "4g",

    G_5 = "5g",

    /**
     * Android 下不常见的网络类型
     */
    UN_KNOWN = "unknown",

    /**
     * 无网络
     */
    NONE = "none",
}