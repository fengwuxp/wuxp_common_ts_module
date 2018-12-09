import {RestTemplate} from "../template/RestTemplate";
import {RestTemplateLoader} from "../template/RestTemplateLoader";
import {FeignOptions} from "../annotations/Feign";
import {getApiModuleName} from "../utils/FeignUtil";
import {FeignProxy} from "./ProxyApiService";

/**
 * 代理服务执行器
 */
export interface ProxyServiceExecutor {

    /**
     * 执行代理服务
     * @param apiService  api服务
     * @param methodName  方法名称
     * @param args        方法参数
     */
    execute<T extends FeignProxy>(apiService: T, methodName: string, ...args): Promise<any>;
}

export abstract class AbstractProxyServiceExecutor implements ProxyServiceExecutor {


    //加载器
    private restTemplateLoader: RestTemplateLoader;


    constructor(restTemplateLoader: RestTemplateLoader) {
        this.restTemplateLoader = restTemplateLoader;
    }

    /**
     * 获取api模块的缓存
     * @param feign
     */
    protected getTemplate = (feign: FeignOptions): RestTemplate => {
        const apiModuleName = getApiModuleName(feign);
        return this.restTemplateLoader.load(apiModuleName);
    };

    abstract execute<T extends FeignProxy>(apiService: T, methodName: string, ...args): Promise<any>;


}