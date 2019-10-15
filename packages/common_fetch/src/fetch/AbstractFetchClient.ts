import {FetchClient} from "./FetchClient";
import {FetchOptions, FetchResponse} from "../FetchOptions";
import {RequestMethod} from "../constant/RequestMethod";
import {FetchAdapter} from "../adapter/FetchAdapter";
import {stringify} from "../utils/QueryString";
import {MediaType} from "../constant/http/MediaType";
import {contentTypeName} from "../constant/FeignConstVar";
import {isEq} from "../utils/MediaTypeUtil";


/**
 * 抽象的fetch client 实现
 */
export default abstract class AbstractFetchClient<T extends FetchOptions> implements FetchClient<T> {

    /**
     * 请求数据的适配器
     */
    private _fetchAdapter: FetchAdapter;


    constructor(fetchAdapter: FetchAdapter) {
        this._fetchAdapter = fetchAdapter;
    }

    delete = (options: T): Promise<FetchResponse> => {
        options.method = RequestMethod.DELETE;
        return this.request(options);
    };

    get = (options: T): Promise<FetchResponse> => {
        options.method = RequestMethod.GET;
        return this.request(options);
    };

    post = (options: T): Promise<FetchResponse> => {
        options.method = RequestMethod.POST;
        return this.request(options);
    };

    put = (options: T): Promise<FetchResponse> => {
        options.method = RequestMethod.PUT;
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

        return this._fetchAdapter.request(this.handleFetchOptions(options));
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


        if (headers[contentTypeName] == null) {
            //默认以表单的形式提交数据
            headers[contentTypeName] = (contentType || MediaType.FORM_DATA);
        }

        const newContentType = headers[contentTypeName];

        options.contentType = newContentType;


        if (method === RequestMethod.GET) {
            //处理查询参数
            const combinedQueryParams = {
                ...data,
                ...queryPrams
            };
            if (Object.keys(combinedQueryParams).length > 0) {
                //过滤无效的数据
                options.url = `${url}${url.endsWith("?") ? '&' : '?'}${stringify(combinedQueryParams, true)}`;
                delete options.data;
                delete options.queryPrams;
            }


        } else /*if (method === RequestMethod.POST)*/ {
            //其他请求
            if (isEq(newContentType, MediaType.FORM_DATA)) {
                //以表单的形式提交数据
                options.data = stringify(data, options.filterEmptyString);
            } else if (isEq(newContentType, MediaType.JSON_UTF8)) {
                //json
                options.data = JSON.stringify(data);
            } else {
            }
        }


        if (options.enabledGzip) {
            //开启gzip压缩
            headers["Accept-Encoding"] = "gzip";
        }

        return options;

    };

    /**
     * @return fetch adapter instance
     */
    get fetchAdapter(): FetchAdapter<FetchOptions> {
        return this._fetchAdapter;
    }

}
