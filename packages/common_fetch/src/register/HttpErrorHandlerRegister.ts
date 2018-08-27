import {HttpCodeHandler} from "../error/HttpErrorHandler";
import AbstractRegistrationBean from "common_core/src/registry/bean/AbstractRegistrationBean";

/**
 *  http错误处理者的注册中心
 */
class HttpErrorHandlerRegister  extends AbstractRegistrationBean<HttpCodeHandler> {



}

//导出唯一的注册中心实例
export default new HttpErrorHandlerRegister();