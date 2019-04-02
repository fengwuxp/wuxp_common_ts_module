/**
 * 用于多个页面传递state数据，数据保存在内存中
 * @author wxup
 * @create 2018-10-06 13:06
 **/
import {isWeb} from "../constant/WeexEnv";
import weexSdkStorage from "../storage/WeexSdkStorage";


//页面状态传递key
const PAGE_VIEW_STATE = "PAGE_VIEW_STATE";


export async function transferViewState() {


    //依赖环境实现的模块
    return weexSdkStorage.getStorage(PAGE_VIEW_STATE)
        .catch(() => {
        });
}

/**
 * 设置下一个页面的状态
 * @param viewState
 */
export async function setNextViewState(viewState: any) {
    if (viewState == null) {
        //清空页面的state
        await weexSdkStorage.setStorage(PAGE_VIEW_STATE, null);
    } else {
        await weexSdkStorage.setStorage(PAGE_VIEW_STATE, viewState);
    }

}
