import {Resolver} from "../Resolver";
import {ProxyApiService} from "../../proxy/ProxyApiService";


/**
 * 抽象的请求url 解析
 */
export default abstract class RequestURLResolver implements Resolver<string> {


    abstract resolve: (apiService: ProxyApiService, serviceMethod: string) => string;


}