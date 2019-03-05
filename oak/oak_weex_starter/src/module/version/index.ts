import {WeexModule} from "weex";

/**
 * weex 版本控制
 */
export interface WeexAppVersionControlModule extends WeexModule {

    /**
     * 检查更新
     * @param versionInfo
     * @param success
     * @param failure
     */
    checkVersion: (versionInfo: VersionInfo, success: () => void, failure: (message: string) => void) => void;
}

export interface VersionInfo {

}