import {FetchProgressBar} from "common_fetch/src/interceptor/default/NeedProgressBarInterceptor";
import {ProgressBarOptions} from "common_fetch/src/FetchOptions";
import TaroJsHolder, {TaroInterfaceHolder} from "taro_starter/src/TaroJsHolder";

export default class OAKTaroFetchProgressBar implements FetchProgressBar {


    private progressBarOptions: ProgressBarOptions;

    protected taroHolder: TaroInterfaceHolder;

    constructor(progressBarOptions?: ProgressBarOptions) {
        this.taroHolder = TaroJsHolder.getTaroHolder();
        this.progressBarOptions = progressBarOptions || {
            title: "数据加载中..."
        };
    }

    hideProgressBar = () => {
        //隐藏加载进度条
        this.taroHolder.taro.hideLoading();
    };

    showProgressBar = (progressBarOptions?: ProgressBarOptions) => {

        this.taroHolder.taro.showLoading({
            ...this.progressBarOptions,
            ...(progressBarOptions || {})
        } as any);
    };


}