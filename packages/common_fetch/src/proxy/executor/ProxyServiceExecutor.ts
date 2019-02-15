import {RestTemplate} from "../../template/RestTemplate";
import {RestTemplateLoader} from "../../template/RestTemplateLoader";
import {FeignOptions} from "../../annotations/Feign";
import {RequestURLResolver} from "../../resolve/url/RequestURLResolver";
import SimpleRequestURLResolver from "../../resolve/url/SimpleRequestURLResolver";
import {RequestHeaderResolver} from "../../resolve/header/RequestHeaderResolver";
import SimpleRequestHeaderResolver from "../../resolve/header/SimpleRequestHeaderResolver";
import {FeignProxy} from "../feign/FeignProxy";
import {ProxyApiService} from "../ProxyApiService";
import {ApiSignatureStrategy} from "../../signature/ApiSignatureStrategy";
import {RequestDataEncoder} from "../RequestDataEncoder";
import DefaultFileUploadStrategy from "../../transfer/DefaultFileUploadStrategy";
import {ProxyUnifiedTransformRequestFileObjectEncoder} from 'proxy/ProxyUnifiedTransformRequestFileObjectEncoder';
import {defaultApiModuleName} from 'constant/FeignConstVar';

/**
 * 代理服务执行器
 */
export interface ProxyServiceExecutor<T extends ProxyApiService = ProxyApiService> {

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

    //签名策略
    protected apiSignatureStrategy: ApiSignatureStrategy;

    //在代理中执行 encoder
    protected requestEncoders: Array<RequestDataEncoder>;

    //加载器
    private restTemplateLoader: RestTemplateLoader;


    /**
     *
     * @param restTemplateLoader     模板加载器
     * @param apiSignatureStrategy   接口签名策略
     * @param requestURLResolver     请求url 解析
     * @param requestHeaderResolver  请求头解析
     * @param requestEncoders        请求数据编码器
     */
    constructor(restTemplateLoader: RestTemplateLoader,
                apiSignatureStrategy: ApiSignatureStrategy,
                requestURLResolver?: RequestURLResolver,
                requestHeaderResolver?: RequestHeaderResolver,
                requestEncoders?: Array<RequestDataEncoder>) {
        this.restTemplateLoader = restTemplateLoader;
        this.apiSignatureStrategy = apiSignatureStrategy;
        this.requestHeaderResolver = requestHeaderResolver || new SimpleRequestHeaderResolver();
        this.requestURLResolver = requestURLResolver || new SimpleRequestURLResolver();
        this.requestEncoders = requestEncoders || [
            new ProxyUnifiedTransformRequestFileObjectEncoder(new DefaultFileUploadStrategy(process.env.UNIFIED_UPLOADFILE_URL, restTemplateLoader.load(defaultApiModuleName)))
        ];
    }

    /**
     * 获取api模块的RestTemplate
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