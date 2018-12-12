import {FetchClient} from "./FetchClient";
import {FetchOptions, FetchResponse} from "../FetchOptions";
import {ReqequestMethod} from "../constant/ReqequestMethod";
import {FetchAdapter} from "../adapter/FetchAdapter";
//promise 扩展
import "../fetch.promise";
import {stringify} from "querystring";
import {MediaType} from "../constant/http/MediaType";


const contentTypeName = 'Content-Type';

/**
 * 抽象的fetch client 实现
 */
export default abstract class AbstractFetchClient<T extends FetchOptions> implements FetchClient<T> {

    /**
     * 请求数据的适配器
     */
    protected fetchAdapter: FetchAdapter;


    constructor(fetchAdapter: FetchAdapter) {
        this.fetchAdapter = fetchAdapter;
    }

    delete = (options: T): Promise<FetchResponse> => {
        options.method = ReqequestMethod.DELETE;
        return this.request(options);
    };

    get = (options: T): Promise<FetchResponse> => {
        options.method = ReqequestMethod.GET;
        return this.request(options);
    };

    post = (options: T): Promise<FetchResponse> => {
        options.method = ReqequestMethod.POST;
        return this.request(options);
    };

    put = (options: T): Promise<FetchResponse> => {
        options.method = ReqequestMethod.PUT;
        return this.request(options);
    };

    abstract request: (options: T) => Promise<FetchResponse>;


    /**
     * 请求数据
     * @param options
     */
    protected fetch = (options: T) => {
        //设置超时时间
        if (options.timeout == null) {
            //默认为10秒
            options.timeout = 10000;
        }

        return this.fetchAdapter.request(this.handleFetchOptions(options));
    };

    /**
     * 处理 fetchOptions
     */
    /**
     * 处理请求参数
     * @param options
     */
    protected handleFetchOptions = (options: T): T => {

        options.headers = options.headers || {};

        const {contentType, data, method, queryPrams, url, headers} = options;

        if (method === ReqequestMethod.GET) {
            //处理查询参数
            const queryParams = {
                ...data,
                ...queryPrams
            };
            options.url = `${url}${url.endsWith("?") ? '&' : "?"}${stringify(queryParams)}`;
            delete options.data;
            delete options.queryPrams;

        } else if (method === ReqequestMethod.POST) {
            //POST请求
            if (contentType === MediaType.FORM_DATA) {
                //以表单的形式提交数据
                options.data = stringify(data);
            } else if (contentType === MediaType.JSON) {
                //json
                options.data = JSON.stringify(data);
            } else {
            }
        }
        if (headers[contentTypeName] == null) {
            //默认以表单的形式提交数据
            headers[contentTypeName] = (contentType || MediaType.FORM_DATA);
        }

        console.debug("--发起请求--->", options);
        return options;

    }


}