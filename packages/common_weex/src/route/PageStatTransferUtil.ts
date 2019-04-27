
import {isWeb} from "../constant/WeexEnv";
import weexSdkStorage from "../storage/WeexSdkStorage";


//页面状态传递key
const PAGE_VIEW_STATE = "PAGE_VIEW_STATE";



/**
 * 用于多个页面传递state数据，数据保存在storage中
 * @author wxup
 * @create 2018-10-06 13:06
 **/
export async function transferViewState() {

    let key = PAGE_VIEW_STATE;
    if (isWeb) {
        const pathname = location.pathname;
        key = `${PAGE_VIEW_STATE}_${pathname.substring(1, pathname.length)}`;
    }
    return weexSdkStorage.getStorage(key)
        .catch(() => {
        });
}

/**
 * 设置下一个页面的状态
 * @param viewState
 * @param pathname
 */
export async function setNextViewState(viewState: any, pathname: string = "") {

    let key = PAGE_VIEW_STATE;
    if (isWeb) {
        key = `${PAGE_VIEW_STATE}_${pathname.split("?")[0]}`;
    }
    if (viewState == null) {
        //清空页面的state
        await weexSdkStorage.setStorage(key, null);
    } else {
        await weexSdkStorage.setStorage(key, viewState);
    }


}
