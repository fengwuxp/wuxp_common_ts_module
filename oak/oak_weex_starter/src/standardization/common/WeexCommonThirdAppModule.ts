import {WeexStandardizedModule} from "common_weex/src/sdk/standardization/WeexStandardizedModule";
import {WeexCommonModule} from "./WeexCommonModule";
import {standardizedWeexModuleToPromise} from "common_weex/src/sdk/standardization/StandardizationHelper";
import {common} from "../../ExpotrtWeexOAKModel";


export interface WeexCommonThirdAppModule extends WeexStandardizedModule {


    /**
     * 某个app是有安装
     */
    // readonly isAppInstalled: (packageName: string) => Promise<boolean>;


    /**
     * 是否安装微信
     */
    readonly isWeChatAppInstalled: () => Promise<boolean>;


    readonly isQQInstalled: () => Promise<boolean>;


    /**
     * 是否安装支付宝
     */
    readonly isAliPayInstalled: () => Promise<boolean>;
}

const weexCommonThirdAppModule = standardizedWeexModuleToPromise<WeexCommonThirdAppModule>({
    module: common,
    transformParamMap: {},
    transformCallbackMap: {
        isAliPayInstalled: (resolve, reject) => [resolve],
        isQQInstalled: (resolve, reject) => [resolve],
        isWeChatAppInstalled: (resolve, reject) => [resolve]
    },
    enhanceMap: {

    }
});

export default weexCommonThirdAppModule;