import RequestURLResolver from "./RequestURLResolver";
import {ProxyApiService} from "../../proxy/ProxyApiService";
import {isNullOrUndefined} from "util";
import {API_BASE_PATH} from "common_env/src/EnvVariable";

/**
 * 简单的url解析者
 */
export default class SimpleRequestURLResolver extends RequestURLResolver {


    resolve = (apiService: ProxyApiService, serviceMethod: string): string => {


        //basePath
        const basePath = API_BASE_PATH || apiService.basePath;

        return `${isNullOrUndefined(basePath) ? '' : apiService.basePath}${apiService['serviceName']}/${serviceMethod as string}`;

    };


}