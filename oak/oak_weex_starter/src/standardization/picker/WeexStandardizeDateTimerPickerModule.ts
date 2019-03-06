import {standardizedWeexModuleToPromise} from "common_weex/src/sdk/standardization/StandardizationHelper";

/**
 * weex 标准化的时间选择器模块
 */
export interface WeexStandardizeDateTimerPickerModule {

    /**
     * 选择时间
     * @param options
     * @return string  字符串格式的时间
     */
    readonly pick: (options: WeexStandardizeDateTimerPickerOptions) => Promise<string>;

    /**
     * 选择日期 年月日
     * @param options
     * @return string yyyy-MM-dd
     */
    readonly pickDate: (options: BaseWeexStandardizeDateTimerPickerOptions) => Promise<string>;


    /**
     * 选择日期 年月日时分
     * @param options
     * @return string yyyy-MM-dd hh:mm
     */
    readonly pickDateTime: (options: BaseWeexStandardizeDateTimerPickerOptions) => Promise<string>;


    /**
     * 选择时分
     * @param value
     * @return string hh:mm
     */
    readonly pickerTime: (options: BaseWeexStandardizeDateTimerPickerOptions) => Promise<string>;
}

export interface BaseWeexStandardizeDateTimerPickerOptions {

    /**
     * 没一列的标题
     * 注意columnTitles格式按年，月，日，时，分，秒顺序
     * 如果希望不出现选择，则填写 N，eg 选择年月则填写：年,月  或是 年,月,N,N,N,N
     * 默认选项：年,月,日
     */
    columnTitles?: string;


    /**
     * 默认当前时间 格式为 yyyy-MM-dd hh:mm:ss
     */
    value?: string;

    /**
     * 时间范围选择开始
     * 默认 1970-01-01 00:00:00
     */
    rangeBegin?: string;

    /**
     * 时间范围选择结束
     * 默认：null
     */
    rangeEnd?: string;

    /**
     * 标题
     */
    title?: string;

    /**
     * 其他配置，例如样式等
     */
    configs?: {
        [key: string]: string
    }
}

export interface WeexStandardizeDateTimerPickerOptions extends BaseWeexStandardizeDateTimerPickerOptions {


    /**
     * 强制格式化类型，如果改字段有值，返回的结果会按照format的格式返回
     * 默认格式：yyyy-MM-dd
     */
    format?: "yyyy" | "MM" | "dd" | "HH" | "mm" | "ss" | "yyyy-MM" | "yyyy-MM-dd" | "HH:mm" | "yyyy-MM-dd HH:mm" | "yyyy-MM-dd HH:mm:ss";


}

const EMPTY_CHAR = "N";

/**
 * 标准化的日期选择工具
 */
export default standardizedWeexModuleToPromise<WeexStandardizeDateTimerPickerModule>({
    module: weex.requireModule("dateTimePicker"),
    transformParamMap: {
        pick: (options: WeexStandardizeDateTimerPickerOptions) => {
            return [
                options.title,
                options.columnTitles,
                options.format == null ? null : options.format.replace("hh", "HH"),
                options.value,
                options.rangeBegin,
                options.rangeEnd,
                options.configs || {}
            ];
        }
    },
    transformCallbackMap: (resolve, reject) => [
        resolve,
        reject
    ],
    enhanceMap: {
        pickDate: (weexStandardizedModule: WeexStandardizeDateTimerPickerModule, options: BaseWeexStandardizeDateTimerPickerOptions) => {
            return weexStandardizedModule.pick(options);
        },
        pickerTime: (weexStandardizedModule: WeexStandardizeDateTimerPickerModule, options: BaseWeexStandardizeDateTimerPickerOptions) => {
            return weexStandardizedModule.pick({
                columnTitles: `${EMPTY_CHAR},${EMPTY_CHAR},${EMPTY_CHAR},时,分`,
                format: "HH:mm",
                ...options
            });
        },
        pickDateTime: (weexStandardizedModule: WeexStandardizeDateTimerPickerModule, options: BaseWeexStandardizeDateTimerPickerOptions) => {
            return weexStandardizedModule.pick({
                columnTitles: `年,月,日,时,分`,
                format: "yyyy-MM-dd HH:mm",
                ...options
            });
        },
    }
});
