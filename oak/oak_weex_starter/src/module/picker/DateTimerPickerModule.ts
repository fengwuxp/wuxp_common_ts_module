import {isWeb} from "fengwuxp_common_weex/src/constant/WeexEnv";
import {WeexDateTimerPickerModule} from "./index";


if (isWeb) {
    const dateTimePicker: WeexDateTimerPickerModule = {
        pick: function (
            title: string,
            selectOptions: string,
            format: string,
            dateTime: string,
            rangeOfStartTime:string ,
            rangeOfEndTime:string,
            configs: {
                [key:string]:any
            },
            success: (result: string) => void,
            failure: () => void) {
            console.log("web端暂时不支持")
        }
    };
    console.log("注册自定义模块 dateTimePicker");
    weex.registerModule('dateTimePicker', dateTimePicker);
}
