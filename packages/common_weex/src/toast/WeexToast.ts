import {modal} from "../sdk/ExportWeexSdkModule";

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

/**
 * 警告框
 * @param options
 * @param callback
 */
export const weexAlert = (options: any = {}, callback) => {
    if (typeof options === "string") {
        options = {message: options}
    }
    options = Object.assign({
        message: "",
        duration: 1,
        okTitle: "确认",
        cancelTitle: "取消"
    }, options);
    modal.alert(options, callback)
};

/**
 * 带确认的对话框
 * @param options 配置详情
 * @param confirm 确认回调
 * @param cancel  取消回调
 */
export const weexConfirm = (options: any = {}, confirm = () => {
}, cancel = () => {
}) => {
    if (typeof options === "string") {
        options = {message: options}
    }
    options = Object.assign({
        message: "",
        duration: 1,
        okTitle: "确认",
        cancelTitle: "取消"
    }, options);
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
 * @param options 配置详情
 * @param confirm 确认回调
 * @param cancel  取消回调
 */
export const weexPrompt = (options: any = {}, confirm = (data) => {
}, cancel = (data) => {
}) => {
    if (typeof options === "string") {
        options = {message: options}
    }
    options = Object.assign({
        message: "",
        duration: .3,
        okTitle: "确认",
        cancelTitle: "取消"
    }, options);
    modal.prompt(options, ({result, data}) => {
        if (result === options.okTitle) {
            confirm(data);
        } else {
            cancel(data);
        }
    });
};
