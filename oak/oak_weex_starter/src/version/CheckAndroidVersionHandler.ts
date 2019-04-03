import {appUpdate, common} from "../ExpotrtWeexOAKModel";
import {isIos} from "common_weex/src/constant/WeexEnv";
import AppConfigRegistry from "common_config/src/app/AppConfigRegistry";
import {AppVersionInfo} from "./AppVersionInfo";
import {PlatformType} from "./PlatformType";
import {FetchOptions} from "common_fetch/src/FetchOptions";
import {weexToast} from "common_weex/src/toast/WeexToast";


interface CheckAppVersionReq {

    appCode: string;

    platformType: PlatformType;

    currVersionCode: number;
}

interface AppService {

    checkAppVersion: (req: CheckAppVersionReq, options?: FetchOptions) => Promise<AppVersionInfo>;
}


/**
 * 检查更新android 版本
 */
export default class CheckAndroidVersionHandler {


    private appService: AppService;


    constructor(appService: AppService) {
        this.appService = appService;
    }

    /**
     * 检测更新(仅支持安卓端)
     */
    checkApkUpdate = (optons: {
        useProgressBar: boolean
    } = {
        useProgressBar: false
    }): Promise<void> => {
        if (isIos) {
            return Promise.reject();
        }


        return new Promise((resolve, reject) => {
            this.isNewestVersion(optons.useProgressBar).then((data) => {
                const resp = {
                    code: 0,
                    data,
                    message: ""
                };
                appUpdate.checkVersion(resp, () => {
                    resolve();
                    console.log("检查更新调用成功!");
                }, (message = "检查更新调用失败") => {
                    reject(message);
                });
            }).catch(reject);

        });

    };

    /**
     * 是否最新版本
     */
    isNewestVersion = (useProgressBar): Promise<AppVersionInfo> => {
        return new Promise<AppVersionInfo>((resolve, reject) => {
            common.getAppVersionInfo(({versionCode, versionName, packageName}) => {
                console.log("当前版本-> " + versionCode);
                this.getAppVersionByServer(versionCode, useProgressBar)
                    .then(resolve)
                    .catch(({message}) => {
                        message = message || "检查更新查询失败";
                        if (useProgressBar) {
                            weexToast(message);
                        }
                        reject(message);
                    });
            }, (message = "获取版本信息失败！") => {
                reject(message);
            });
        })
    };


    /**
     * 从服务端获取版本号
     * @param versionCode
     * @param useProgressBar
     */
    private getAppVersionByServer = (versionCode: string | number, useProgressBar: boolean = false): Promise<AppVersionInfo> => {

        return this.appService.checkAppVersion({
            appCode: AppConfigRegistry.get().androidAppCode,
            platformType: PlatformType.ANDROID,
            currVersionCode: parseInt(versionCode.toString())
        }, {useProgressBar, useUnifiedToast: false});
    }
}