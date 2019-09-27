import {appUpdate, common} from "../ExpotrtWeexOAKModel";
import {isIos} from "fengwuxp_common_weex/src/constant/WeexEnv";
import AppConfigRegistry from "fengwuxp_common_config/src/app/AppConfigRegistry";
import {AppVersionInfo} from "./AppVersionInfo";
import {PlatformType} from "./PlatformType";
import {FetchOptions} from "fengwuxp_common_fetch/src/FetchOptions";
import {weexToast} from "fengwuxp_common_weex/src/toast/WeexToast";
import {LocalVersionInfo} from "./LocalVersionInfo";


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

        return this.getLocalVersion().then(({versionCode}) => {
            return this.getAppVersionByServer(versionCode, useProgressBar)
                .catch(({message}) => {
                    message = message || "检查更新查询失败";
                    if (useProgressBar) {
                        weexToast(message);
                    }
                    return Promise.reject(message);
                });
        })
    };

    /**
     * 获取本地版本
     */
    getLocalVersion = (): Promise<LocalVersionInfo> => {
        return new Promise<LocalVersionInfo>((resolve, reject) => {
            common.getAppVersionInfo(({versionCode, versionName, packageName}) => {

                resolve({
                    versionCode,
                    versionName,
                    packageName
                })

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
