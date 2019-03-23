import {WeexModule} from "../../../../index";

/**
 * weex modal
 * https://weex.apache.org/cn/references/modules/modal.html
 */
export interface WeexModalModule extends WeexModule {

    /**
     * 弹出提示
     * @param {WeexToastOptions} options
     */
    readonly toast: (options: WeexToastOptions) => void;

    /**
     * 警告
     * @param {WeexAlertOptions} options
     */
    readonly alert: (options: WeexAlertOptions, callback: (value: string) => void) => void;

    /**
     * 确认框
     * @param {WeexConfirmOptions} options
     * @param {(value: string) => void} callback
     */
    readonly confirm: (options: WeexConfirmOptions, callback: (value: string) => void) => void;


    /**
     * 提示框
     * @param {WeexPromptOptions} options
     * @param {(result: WeexPromptResult) => void} callback
     */
    readonly prompt: (options: WeexPromptOptions, callback: (result: WeexPromptResult) => void) => void;
}

export interface WeexToastOptions {

    /**
     * 展示的内容
     */
    message: string
    /**
     * 展示的持续时间（以秒为单位）
     */
    duration?: number
}

export interface WeexAlertOptions {

    /**
     * 警告框内显示的文字信息
     */
    message: string

    /**
     * 确定按钮上显示的文字信息，默认是“OK”
     */
    okTitle?: string,
}


export interface WeexConfirmOptions {

    /**
     * 提示框内要显示的文字信息
     */
    message: string;
    /**
     * 确认按钮上显示的文字信息，默认是 OK
     */
    okTitle?: string;
    /**
     * 取消按钮上显示的文字信息，默认是 Cancel
     */
    cancelTitle?: string;


}

export interface WeexPromptOptions extends WeexConfirmOptions {

}


export interface WeexPromptResult {

    /**
     * 用户按下的按钮上的文字信息
     */
    result: string;

    /**
     * 用户输入的文字信息
     */
    data: string;
}


