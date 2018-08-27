import {WeexModule} from "../../../../index";

/**
 * weex picker
 * https://weex.apache.org/cn/references/modules/picker.html
 */
export interface WeexPickerModule extends WeexModule {

    readonly pickDate: (options: WeexPickerDateOptions, callback: WeexPickerCallback) => void;

    readonly pickTime: (options: WeexPickerTimerOptions, callback: WeexPickerCallback) => void;

    readonly pick: (options: WeexPickerOptions, callback: WeexPickerCallback) => void;
}

/**
 * callback {function (ret)}：执行完读取操作后的回调函数。ret {Object} 为 callback 函数的参数，
 * 有两个属性：
 * result {string}：结果三种类型 success, cancel, error
 *
 * data属性的情况：
 * picker:data {number}：选择的选项,仅成功确认时候存在。
 * pickerDate:data {string}：选择的值 date 的字符，格式为 yyyy-MM-dd, 仅成功确认的时候存
 * pickerTimer:data {string}：time 格式为 HH:mm, 仅成功确认的时候存在。
 */
type WeexPickerCallback = (ret: { result: "success" | "cancel" | "error", data?: number | string }) => void;


export interface WeexPickerDateOptions extends WeexPickerTimerOptions {

    /**
     * 可选，date 的最大值
     */
    max?: string;

    /**
     * 可选，date 的最小值
     */
    min?: string
}

export interface WeexPickerTimerOptions {

    /**
     * 必填，date picker 选中的值，date 的字符串格式为yyyy-MM-dd
     */
    value: string;
}


export interface WeexPickerOptions {
    /**
     * 默认选中的选项
     */
    index: number;

    /**
     * ：picker 数据源
     */
    items: Array<string>;

    /**
     * picker中文字的颜色
     */
    textColor?: string;

    /**
     * picker中选中item的背景色
     */
    selectionColor?: string;

    /**
     * 确认按钮的文案
     */
    confirmTitle?: string;

    /**
     * 取消按钮的文案
     */
    cancelTitle?: string;

    /**
     * 确认按钮的文字颜色
     */
    confirmTitleColor?: string;

    /**
     * 取消按钮的文字颜色
     */
    cancelTitleColor?: string;

    /**
     * 对话框的标题
     */
    title?: string;

    /**
     * 对话框标题的文字颜色
     */
    titleColor?: string;


    /**
     * 对话框标题的背景色
     */
    titleBackgroundColor?: string;


}
