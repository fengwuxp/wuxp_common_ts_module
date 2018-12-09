import {FetchClient} from "./FetchClient";
import {FetchAdapter} from "../adapter/FetchAdapter";
import {FetchOptions, FetchResponse} from "../FetchOptions";
import {ReqequestMethod} from "../constant/ReqequestMethod";
import {stringify} from "querystring";
import {MediaType} from "../constant/http/MediaType";

const contentTypeName = 'Content-Type';

/**
 * 默认的请求客户端
 */
export default class DefaultFetchClient implements FetchClient {

    /**
     * 请求数据的适配器
     */
    private fetchAdapter: FetchAdapter;


    constructor(fetchAdapter: FetchAdapter) {
        this.fetchAdapter = fetchAdapter;
    }


    delete = (options: FetchOptions): Promise<FetchResponse> => {
        options.method = ReqequestMethod.DELETE;
        return this.request(options);
    };

    get = (options: FetchOptions): Promise<FetchResponse> => {
        options.method = ReqequestMethod.GET;
        return this.request(options);
    };

    post = (options: FetchOptions): Promise<FetchResponse> => {
        options.method = ReqequestMethod.POST;
        return this.request(options);
    };

    put = (options: FetchOptions): Promise<FetchResponse> => {
        options.method = ReqequestMethod.PUT;
        return this.request(options);
    };


    request = (options: FetchOptions): Promise<FetchResponse> => {

        return this.fetchAdapter.request(this.handleFetchOptions(options));
    };


    /**
     * 处理请求参数
     * @param options
     */
    protected handleFetchOptions = (options: FetchOptions) => {
        const {contentType, data, method, queryPrams, url, headers} = options;

        if (method === ReqequestMethod.GET) {
            //处理查询参数
            let queryParams = {
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

            if (headers[contentTypeName] == null) {
                //默认以表单的形式提交数据
                headers[contentType] = (contentType || MediaType.FORM_DATA);
            }
        }


        return options;

    }


}
