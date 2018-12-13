import {FetchProgressBar} from "common_fetch/src/interceptor/default/NeedProgressBarInterceptor";
import {appMain} from "../ExpotrtWeexOAKModel";


export default class OAKFetchProgressBar implements FetchProgressBar {

    private count: number = 0;

    hideProgressBar = () => {
        //计数器减一
        this.count--;
        if (this.count === 0) {
            //隐藏加载进度条
            appMain.hideProgressBar();
        }
    };

    showProgressBar = () => {

        if (this.count === 0) {
            //显示加载进度条
            appMain.showProgressBar(20, () => {
            });
        }
        //计数器加一
        this.count++;
    };


}