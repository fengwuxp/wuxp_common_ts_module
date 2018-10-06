/**
 * TODO 用于多个页面传递state数据，数据保存在内存中
 * @author wxup
 * @create 2018-10-06 13:06
 **/
import {isWeb} from "../WeexEnvUtil";

//页面状态
let VIEW_STATE;

export async function transferViewState() {


    if (isWeb) {
        //web环境
        return await VIEW_STATE;
    }
    //TODO 依赖原生实现的内存模块


    return {};
}

/**
 * 设置下一个页面的状态
 * @param viewState
 */
export async function setNextViewState(viewState: any) {

    VIEW_STATE = viewState;
}
