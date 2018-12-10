import {RestTemplate} from "../../template/RestTemplate";
import {RestTemplateLoader} from "../../template/RestTemplateLoader";
import {FeignOptions} from "../../annotations/Feign";
import {RequestURLResolver} from "../../resolve/url/RequestURLResolver";
import SimpleRequestURLResolver from "../../resolve/url/SimpleRequestURLResolver";
import {RequestHeaderResolver} from "../../resolve/header/RequestHeaderResolver";
import SimpleRequestHeaderResolver from "../../resolve/header/SimpleRequestHeaderResolver";
import {FeignProxy} from "../feign/FeignProxy";
import {ProxyApiService} from "../ProxyApiService";

/**
 * 代理服务执行器
 */
export interface ProxyServiceExecutor<T extends ProxyApiService=ProxyApiService> {

    /**
     * 执行代理服务
     * @param apiService  api服务
     * @param methodName  方法名称
     * @param args        方法参数
     */
    execute(apiService: T, methodName: string, ...args): Promise<any>;
}

export abstract class AbstractProxyServiceExecutor implements ProxyServiceExecutor<FeignProxy> {


    //url 解析
    protected requestURLResolver: RequestURLResolver;

    //请求头解析
    protected requestHeaderResolver: RequestHeaderResolver;

    //加载器
    private restTemplateLoader: RestTemplateLoader;


    constructor(restTemplateLoader: RestTemplateLoader,
                requestURLResolver?: RequestURLResolver,
                requestHeaderResolver?: RequestHeaderResolver) {
        this.restTemplateLoader = restTemplateLoader;
        this.requestHeaderResolver = requestHeaderResolver || new SimpleRequestHeaderResolver();
        this.requestURLResolver = requestURLResolver || new SimpleRequestURLResolver();
    }

    /**
     * 获取api模块的缓存
     * @param feignOptions
     */
    protected getTemplate = (feignOptions: FeignOptions): RestTemplate => {
        const apiModuleName = feignOptions.apiModule;
        return this.restTemplateLoader.load(apiModuleName);
    };

    /**
     * 执行请求
     * @param apiService  服务实例
     * @param methodName  服务方法名称
     * @param args        参数列表
     */
    abstract execute(apiService: FeignProxy, methodName: string, ...args): Promise<any>;


}