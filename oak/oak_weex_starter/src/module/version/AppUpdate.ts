import {isWeb} from "common_weex/src/constant/WeexEnv";
import {WeexAppVersionControlModule} from "./index";

/**
 * 自定义appUpdate 模块
 */
if (isWeb) {
    const appUpdateModal:WeexAppVersionControlModule = {

        /**
         * 检查更新
         * @param versionData 检查更新接口返回的json
         * @param succ
         * @param fail
         */
        checkVersion(versionData, succ = () => {
        }, fail = () => {
        }) {
            console.log("web环境暂不支持 openApp");
        }
    };
    console.log("注册自定义模块 appUpdate");
    weex.registerModule('appUpdate', appUpdateModal);
}
