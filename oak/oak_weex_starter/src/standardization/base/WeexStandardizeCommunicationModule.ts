import {standardizedWeexModuleToPromise} from "common_weex/src/sdk/standardization/StandardizationHelper";
import {appMain} from "../../ExpotrtWeexOAKModel";
import {WeexStandardizedModule} from "common_weex/src/sdk/standardization/WeexStandardizedModule";

/**
 *  通讯能力
 */
export interface WeexStandardizeCommunicationModule  extends WeexStandardizedModule {


    /**
     * 打电话
     * @param mobilePhone  手机号码
     * @param callNow      是否立即拨打，默认false
     */
    readonly callPhone: (mobilePhone: string, callNow?: boolean) => Promise<void>;
}


const weexStandardizeCommunicationModule = standardizedWeexModuleToPromise<WeexStandardizeCommunicationModule>({
    module: {},
    enhanceMap: {
        callPhone: (communicationModule: WeexStandardizeCommunicationModule, mobilePhone: string, callNow: boolean = false) => {
            return new Promise<void>((resolve, reject) => {

                appMain.callPhone(callNow, mobilePhone, resolve, reject);
            });
        }
    },
    transformCallbackMap: {},
    transformParamMap: {}
});

export default weexStandardizeCommunicationModule;