import {modal, timer} from "../ExportWeexSdkModel";
import {isString} from "util";

/**
 * toast
 * @param message  消息
 * @param times    提示的时间长度 单位:秒
 * @param callback 回调
 */
export const toast = (message: string, times: number = 2, callback?: () => void,) => {
    modal.toast({message: message, duration: times});
    if (callback == null) {
        return;
    }
    timer.setTimeout(callback, times * 1000);
};

/**
 * 警告框
 * @param options
 * @param callback
 */
export const alert = (options: any = {}, callback) => {
    if (isString(options)) {
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
export const confirm = (options: any = {}, confirm = () => {}, cancel = () => {}) => {
    if (isString(options)) {
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
export const prompt = (options: any = {}, confirm = (data) => {
}, cancel = (data) => {
}) => {
    if (isString(options)) {
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