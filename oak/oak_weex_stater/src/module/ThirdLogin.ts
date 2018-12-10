import {isWeb} from "common_weex/src/constant/WeexEnv";
/**
 * 自定义photo
 * Created by wuxp on 2017/6/6.
 */
if (isWeb) {

    const thirdLogin:any={
        wxLogin(){
            console.log("web端暂不支持");
        }
    };
    console.log("注册自定义模块 thirdLogin");
    weex.registerModule('thirdLogin', thirdLogin);
}
