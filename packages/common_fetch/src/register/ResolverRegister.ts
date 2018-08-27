import AbstractRegistrationBean from "common_core/src/registry/bean/AbstractRegistrationBean";
import {Resolver} from "../resolve/Resolver";
import {ArgumentsResolver} from "../resolve/arguments/ArgumentsResolver";
import RequestURLResolver from "../resolve/url/RequestURLResolver";


export const argumentResolverName = "argumentResolver";
export const requestURLResolverName = "requestURLResolver";

/**
 * 解析者注册器
 */
class ResolverRegister extends AbstractRegistrationBean<Resolver> {

    registerArgumentsResolver = (relover: ArgumentsResolver) => this.register(argumentResolverName, relover);

    registerRequestURLResolver = (relover: RequestURLResolver) => this.register(requestURLResolverName, relover);

}

export default new ResolverRegister();


