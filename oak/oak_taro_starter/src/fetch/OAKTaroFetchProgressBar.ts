import {FetchProgressBar} from "common_fetch/src/interceptor/default/NeedProgressBarInterceptor";
import {ProgressBarOptions} from "common_fetch/src/FetchOptions";
import {TaroInterface} from "taro_starter/src/TaroJsHolder";

export default class OAKTaroFetchProgressBar implements FetchProgressBar {


    private progressBarOptions: ProgressBarOptions;

    private taro: TaroInterface;


    constructor(taro: TaroInterface, progressBarOptions?: ProgressBarOptions) {
        this.taro = taro;
        this.progressBarOptions = progressBarOptions || {
            title: "数据加载中..."
        };
    }

    hideProgressBar = () => {
        //隐藏加载进度条
        this.taro.hideLoading();
    };

    showProgressBar = (progressBarOptions?: ProgressBarOptions) => {

        this.taro.showLoading({
            ...this.progressBarOptions,
            ...(progressBarOptions || {})
        } as any);
    };


}