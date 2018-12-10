import {FetchProgressBar} from "common_fetch/src/interceptor/default/NeedProgressBarInterceptor";
import {appMain} from "../ExpotrtWeexOAKModel";


let PROGRESSBAR_COUNT: number = 0;

export default class OAKFetchProgressBar implements FetchProgressBar {


    hideProgressBar = () => {

        if (PROGRESSBAR_COUNT === 0) {
            //显示加载进度条
            appMain.showProgressBar(20, () => {
            });
        }
        //计数器加一
        PROGRESSBAR_COUNT++;
    };

    showProgressBar = () => {
        //计数器减一
        PROGRESSBAR_COUNT--;
        if (PROGRESSBAR_COUNT === 0) {
            //隐藏加载进度条
            appMain.hideProgressBar();
        }
    };


}