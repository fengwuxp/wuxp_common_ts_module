import {SimpleView} from "common_view/src/SimpleView";

/**
 * 登录页面
 */
export interface LoginView<T> extends SimpleView<T> {


    /**
     * 登录
     * @param args
     */
    login: (...args) => any;




}