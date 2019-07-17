import RequestURLResolver from "fengwuxp_common_fetch/src/resolve/url/RequestURLResolver"
import {ProxyApiService} from "fengwuxp_common_fetch/src/proxy/ProxyApiService";


export default class CustomRequestURLResolver extends RequestURLResolver {


    resolve = (apiService: ProxyApiService, serviceMethod: string): string => {

        console.log("-serviceMethod->", serviceMethod);
        return `${serviceMethod}`;


    }
}