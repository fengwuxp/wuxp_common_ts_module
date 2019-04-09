import {isWeb} from "common_weex/src/constant/WeexEnv";
import {WeexKeyboardModule} from "./index";


if (isWeb) {

    const keyboardModule: WeexKeyboardModule = {
        isVisible() {
            console.log("web端不支持");
            return false;
        },
        keyboardHide() {
            console.log("web端不支持");
        }


    };

    console.log("注册自定义模块 keyBoard");
    weex.registerModule('keyBoard', keyboardModule);
}