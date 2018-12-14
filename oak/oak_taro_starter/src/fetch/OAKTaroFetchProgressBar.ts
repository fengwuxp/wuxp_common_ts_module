import {FetchProgressBar} from "common_fetch/src/interceptor/default/NeedProgressBarInterceptor";
import {ProgressBarOptions} from "common_fetch/src/FetchOptions";

export default class OAKTaroFetchProgressBar implements FetchProgressBar {

    //计数器，全局共享
    private static count: number = 0;

    private progressBarOptions: ProgressBarOptions;

    private taro: any;


    constructor(taro: any, progressBarOptions?: ProgressBarOptions) {
        this.taro = taro;
        this.progressBarOptions = progressBarOptions || {
            title: "数据加载中..."
        };
    }

    hideProgressBar = () => {
        //计数器减一
        OAKTaroFetchProgressBar.count--;
        if (OAKTaroFetchProgressBar.count === 0) {
            //隐藏加载进度条
            this.taro.hideLoading();
        }
    };

    showProgressBar = (progressBarOptions?: ProgressBarOptions) => {

        if (OAKTaroFetchProgressBar.count === 0) {
            //显示加载进度条
            this.taro.showLoading({
                ...this.progressBarOptions,
                ...(progressBarOptions || {})
            } as any);
        }
        //计数器加一
        OAKTaroFetchProgressBar.count++;
    };


}