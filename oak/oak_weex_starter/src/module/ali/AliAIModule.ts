import {isWeb} from "fengwuxp_common_weex/src/constant/WeexEnv";
import {AliAIModule} from "./index";


if (isWeb) {

    const aliAIModule: AliAIModule = {
        faceVerify: (verifyToken: string, params: any, success, failure) => {
            console.log("aliAIModule", verifyToken);
        }
    };
    console.log("注册自定义模块 aliAI");
    weex.registerModule('aliAI', aliAIModule);
}
