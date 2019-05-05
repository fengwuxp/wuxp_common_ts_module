import {WeexStandardizedModule} from "common_weex/src/sdk/standardization/WeexStandardizedModule";
import {WeexCommonModule} from "./WeexCommonModule";
import {standardizedWeexModuleToPromise} from "common_weex/src/sdk/standardization/StandardizationHelper";
import {common} from "../../ExpotrtWeexOAKModel";


export interface WeexCommonThirdAppModule extends WeexStandardizedModule {


    /**
     * 某个app是有安装
     */
    readonly isInstallApp: (packageName: string) => Promise<boolean>;


    /**
     * 是否安装微信
     */
    readonly isInstallWeChat: () => Promise<boolean>;


    /**
     * 是否安装支付宝
     */
    readonly isInstallAliPay: () => Promise<boolean>;
}

const weexCommonThirdAppModule = standardizedWeexModuleToPromise<WeexCommonThirdAppModule>({
    module: common,
    enhanceMap: {
        isInstallAliPay: function () {
            return undefined;
        },
        isInstallApp: function (p1: string) {
            return undefined;
        },
        isInstallWeChat: () => {
            return new Promise((resolve, reject) => {
                common.isWXInstalled(resolve);
            });
        }

    }
});

export default weexCommonThirdAppModule;