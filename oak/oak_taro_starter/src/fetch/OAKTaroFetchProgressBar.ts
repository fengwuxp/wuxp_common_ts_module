import {FetchProgressBar} from "common_fetch/src/interceptor/default/NeedProgressBarInterceptor";
import * as Taro from "@tarojs/taro";
import {ProgressBarOptions} from "common_fetch/src/FetchOptions";


export default class OAKTaroFetchProgressBar implements FetchProgressBar {

    //计数器，全局共享
    private static count: number = 0;

    private progressBarOptions: ProgressBarOptions;


    constructor(progressBarOptions?: ProgressBarOptions) {
        this.progressBarOptions = progressBarOptions||{};
    }

    hideProgressBar = () => {
        //计数器减一
        OAKTaroFetchProgressBar.count--;
        if (OAKTaroFetchProgressBar.count === 0) {
            //隐藏加载进度条
            Taro.hideLoading();
        }
    };

    showProgressBar = (progressBarOptions?: ProgressBarOptions) => {

        if (OAKTaroFetchProgressBar.count === 0) {
            //显示加载进度条
            Taro.showLoading({
                ...this.progressBarOptions,
                ...(progressBarOptions || {})
            } as any);
        }
        //计数器加一
        OAKTaroFetchProgressBar.count++;
    };


}