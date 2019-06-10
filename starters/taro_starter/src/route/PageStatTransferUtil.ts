/**
 * 用于多个页面传递state数据，数据保存在内存中
 * @author wxup
 * @create 2018-10-06 13:06
 **/
import TaroLocalStorage from "../storage/TaroLocalStorage";


//页面状态传递key
const PAGE_VIEW_STATE = "PAGE_VIEW_STATE";


export async function transferViewState() {


    //依赖环境实现的模块
    return TaroLocalStorage.getStorage(PAGE_VIEW_STATE)
        .catch(() => {
            return Promise.resolve(null);
        });
}

/**
 * 设置下一个页面的状态
 * @param viewState
 */
export async function setNextViewState(viewState: any) {

    if (viewState == null) {
        //清空页面的state
        await TaroLocalStorage.setStorage(PAGE_VIEW_STATE, null);
    } else {
        await TaroLocalStorage.setStorage(PAGE_VIEW_STATE, viewState);
    }

}
