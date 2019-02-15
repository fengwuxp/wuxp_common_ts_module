import {appUpdate, common} from "../ExpotrtWeexOAKModel";
import {isIos} from "common_weex/src/constant/WeexEnv";
import AppConfigRegistry from "common_config/src/app/AppConfigRegistry";
import {AppVersionInfo} from "./AppVersionInfo";
import {PlatformType} from "./PlatformType";
import {FetchOptions} from "common_fetch/src/FetchOptions";


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
    checkApkUpdate = (): Promise<void> => {
        if (isIos) {
            return Promise.reject();
        }


        return new Promise((resolve, reject) => {
            this.isNewestVersion().then((data) => {
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
            }).catch((e) => {
                console.log(`获取版本信息失败 ：${e}`)
            });

        })

    };

    /**
     * 是否最新版本
     */
    isNewestVersion = (): Promise<AppVersionInfo> => {
        return new Promise<AppVersionInfo>((resolve, reject) => {
            common.getAppVersionInfo(({versionCode, versionName, packageName}) => {
                console.log("当前版本-> " + versionCode);
                this.getAppVersionByServer(versionCode)
                    .then(resolve)
                    .catch(({message}) => {
                        console.log(message ? message : "检查更新查询失败!");
                    });
            }, (message = "获取版本信息失败！") => {
                reject(message);
            });
        })
    };


    /**
     * 从服务端获取版本号
     * @param versionCode
     */
    private getAppVersionByServer = (versionCode: string | number): Promise<AppVersionInfo> => {

        return this.appService.checkAppVersion({
            appCode: AppConfigRegistry.get().androidAppCode,
            platformType: PlatformType.ANDROID,
            currVersionCode: parseInt(versionCode.toString())
        }, {useProgressBar: false});
    }
}