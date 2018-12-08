/**
 * 拦截器的执行方式
 */
export enum ExecuteMethod {

    //只在请求成功的时候做处理
    //成功是指http状态和业务均成功
    ONLY_SUCCESS,

    //只在失败的时候执行
    //失败是指请求失败或者业务验证失败
    ONLY_ERROR,

    //只执行前置方法
    ONLY_PREV,

    //只执行后置方法
    ONLY_POST,

    ALL

}