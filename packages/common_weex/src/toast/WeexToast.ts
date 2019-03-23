import {modal} from "../sdk/ExportWeexSdkModule";
import {WeexAlertOptions, WeexPromptOptions, WeexConfirmOptions} from "weex/src/sdk/model/modal";

/**
 * toast
 * @param message  消息
 * @param times    提示的时间长度 单位:秒
 * @param callback 回调
 */
export const weexToast = (message: string, times: number = 2, callback?: () => void,) => {
    modal.toast({message: message, duration: times});
    if (callback == null) {
        return;
    }
    setTimeout(callback, times * 1000);
};

interface BaseOptions {

    /**
     * 消息
     */
    message: string,
}


/**
 * 警告框
 * @param params
 * @param callback
 */
export const weexAlert = (params: string | WeexAlertOptions, callback) => {
    let options: WeexAlertOptions = {
        message: "",
        okTitle: "确认",
    };
    if (typeof params === "string") {
        options.message = params;
    } else {
        options = {
            ...options,
            ...params
        };
    }
    modal.alert(options, callback)
};

/**
 * 带确认的对话框
 * @param params 配置详情
 * @param confirm 确认回调
 * @param cancel  取消回调
 */
export const weexConfirm = (params: string | WeexConfirmOptions, confirm = () => {
}, cancel = () => {
}) => {
    let options: WeexConfirmOptions = {
        okTitle: "确认",
        cancelTitle: "取消",
        message: ""
    };
    if (typeof params === "string") {
        options.message = params;
    } else {
        options = {
            ...options,
            ...params
        };
    }
    modal.confirm(options, (result) => {
        if (result === options.okTitle) {
            confirm();
        } else {
            cancel();
        }
    });
};

/**
 * 带输入框的对话框
 * @param params 配置详情
 * @param confirm 确认回调
 * @param cancel  取消回调
 */
export const weexPrompt = (params: string | WeexPromptOptions, confirm = (data) => {
}, cancel = (data) => {
}) => {

    let options: WeexPromptOptions = {
        okTitle: "确认",
        cancelTitle: "取消",
        message: ""
    };
    if (typeof params === "string") {
        options.message = params;
    } else {
        options = {
            ...options,
            ...params
        };
    }
    modal.prompt(options, ({result, data}) => {
        if (result === options.okTitle) {
            confirm(data);
        } else {
            cancel(data);
        }
    });
};
