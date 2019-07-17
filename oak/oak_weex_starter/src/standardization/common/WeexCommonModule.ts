import {WeexStandardizedModule} from "fengwuxp_common_weex/src/sdk/standardization/WeexStandardizedModule";
import {standardizedWeexModuleToPromise} from "fengwuxp_common_weex/src/sdk/standardization/StandardizationHelper";
import {common, appMain} from "../../ExpotrtWeexOAKModel";
import {isAndroid} from "fengwuxp_common_weex/src/constant/WeexEnv";


/**
 * weex 通用模块
 */
export interface WeexCommonModule extends WeexStandardizedModule {


    /**
     * 打开第三方应用
     * @param options
     */
    openThirdApp: (options: OpenThirdAppOptions) => Promise<void>;

    /**
     * 打开外部浏览器
     * @param url
     */
    openBrowser: (url: string) => Promise<void>;

    /**
     * 打开内部浏览器
     * @param options
     */
    openInternalBrowser: (options: {
        url: string
    }) => Promise<void>;
}

export interface OpenThirdAppOptions {


    /**
     * 包名
     * 如果安卓和ios包名一直就传字符串，否则传对象
     */
    packageName: string | {
        android: string,
        ios: string;
    };

    /**
     * 下载地址
     */
    download: {
        android: string,
        ios: string;
    }
}

const commonModule = standardizedWeexModuleToPromise<WeexCommonModule>({
    module: {},
    enhanceMap: {
        openThirdApp(weexStandardizedModule, options: OpenThirdAppOptions) {

            const {packageName, download} = options;

            return new Promise((resolve, reject) => {
                common.openApp(typeof packageName === "string" ? packageName : isAndroid ? packageName.android : packageName.ios,
                    isAndroid ? download.android : download.ios, resolve, reject);
            });
        },
        openBrowser(weexStandardizedModule, url: string) {

            return new Promise((resolve, reject) => {
                appMain.openActivity("BROWSER", {url}, resolve, reject);
            });
        },
        openInternalBrowser(weexStandardizedModule, options: {
            url: string
        }) {
            const {url} = options;
            return new Promise((resolve, reject) => {
                appMain.openActivity("URL", {url}, resolve, reject);
            });
        }


    }
});

export default commonModule;