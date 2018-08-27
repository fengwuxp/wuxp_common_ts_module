import {FetchInterceptor} from "../interceptor/FetchInterceptor";
import AbstractRegistrationBean from "common_core/src/registry/bean/AbstractRegistrationBean";


/**
 * 拦截器注册中心
 */
class FetchInterceptorRegister extends AbstractRegistrationBean<FetchInterceptor> {


}

//导出唯一的实例
export default new FetchInterceptorRegister();