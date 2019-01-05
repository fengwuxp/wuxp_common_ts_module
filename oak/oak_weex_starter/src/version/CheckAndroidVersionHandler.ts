import {appUpdate, common} from "../ExpotrtWeexOAKModel";
import {isIos} from "common_weex/src/constant/WeexEnv";
import AppConfigRegistry from "common_config/src/app/AppConfigRegistry";

interface AppService {

    checkAppVersion: Function;
}

interface CheckResult {

    code: number;

    /**
     * 是否最新版本
     */
    newestVersion: boolean
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
    isNewestVersion = (): Promise<CheckResult> => {
        return new Promise<CheckResult>((resolve, reject) => {
            common.getAppVersionInfo(({versionCode, versionName, packageName}) => {
                console.log("当前版本-> " + versionCode);

                this.getAppVersionByServer(versionCode).then((data) => {
                    if (data == null) {
                        reject();
                        return;
                    }
                    const {code} = data;
                    if (code <= versionCode) {
                        resolve({
                            code,
                            newestVersion: true
                        })
                    } else {
                        resolve({
                            code,
                            newestVersion: false
                        });
                    }
                }).catch(({message}) => {
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
    private getAppVersionByServer = (versionCode): Promise<any> => {

        return this.appService.checkAppVersion({
            appCode: AppConfigRegistry.get().androidAppCode,
            platformType: "ANDROID",
            currVersionCode: parseInt(versionCode)
        }, {useProgressBar: false});
    }
}