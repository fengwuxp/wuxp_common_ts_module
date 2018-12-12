import {BaseAppView} from "../../../../../packages/common_view/src/BaseAppView";

/**
 * 登录页面
 */
export interface LoginView<T> extends BaseAppView<T> {


    /**
     * 登录
     * @param args
     */
    login: (...args) => any;




}