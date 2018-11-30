/**
 * 应用程序启动入口
 **/
export interface AppBootStarter<T> {

    //启动
    startup: (...args) => void | Promise<T>;
}