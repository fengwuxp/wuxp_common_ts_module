import {WeexModule} from "weex";


/**
 * weex 日期选择器
 */
export interface WeexDateTimerPickerModule extends WeexModule {


    /**
     * 注意selectOptions格式按年，月，日，时，分，秒顺序
     * 如果希望不出现选择，则填写 N，eg 选择年月则填写：年,月  或是 年,月,N,N,N,N
     *
     * @param title             可以空， 默认 请选择
     * @param selectOptions     可以空， 默认选项：年月日
     * @param format            可以空， 默认格式：yyyy-MM-dd
     * @param dateTime          可以空， 默认当前时间
     * @param rangeOfStartTime  开始时间
     * @param rangeOfEndTime    结束时间
     * @param configs           其他配置
     * @param success
     * @param failure
     */
    readonly pick: (title: string,
                    selectOptions: string,
                    format: string,
                    dateTime: string,
                    rangeOfStartTime: string,
                    rangeOfEndTime: string,
                    configs: {},
                    success: (result: string) => void,
                    failure: () => void) => void;
}