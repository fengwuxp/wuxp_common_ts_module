import {isWeb} from "../../constant/WeexEnv";
import {WeexPickerModule} from "weex/src/sdk/model/picker";
/**
 * 自定义picker 保存对象
 * Created by wuxp on 2017/6/6.
 */
if (isWeb) {

    const pickerModal:WeexPickerModule={
        pickDate(){
            console.log("web端暂不支持");
        },
        pickTime(){
            console.log("web端暂不支持");
        },
        pick(){
            console.log("web端暂不支持");
        }
    };
    console.log("注册自定义模块 picker");
    weex.registerModule('picker', pickerModal);
}
