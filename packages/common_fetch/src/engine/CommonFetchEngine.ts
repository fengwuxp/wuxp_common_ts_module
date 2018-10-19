import {HttpRequestEngine} from "./HttpRequestEngine";
import {FetchAdapter} from "../adapter/FetchAdapter";
import {FetchOptions, FetchResponse} from "../fetch/FetchOptions";
import {ReqMethod} from "../enums/ReqMethod";
import {stringify} from "querystring";
import {SerializeType} from "../enums/http/SerializeType";
import {isNullOrUndefined} from "util";
import {MediaType} from "../enums/http/ContentType";

/**
 * 通用的http请求引擎
 */
export default class CommonFetchEngine implements HttpRequestEngine {

    /**
     * 请求数据的适配器
     */
    private fetchAdapter: FetchAdapter;


    constructor(fetchAdapter: FetchAdapter) {
        this.fetchAdapter = fetchAdapter;
    }


    delete = (options: FetchOptions): Promise<FetchResponse> => {
        options.method = ReqMethod.DELETE;
        return this.request(options);
    };

    get = (options: FetchOptions): Promise<FetchResponse> => {
        options.method = ReqMethod.GET;
        return this.request(options);
    };

    post = (options: FetchOptions): Promise<FetchResponse> => {
        options.method = ReqMethod.POST;
        return this.request(options);
    };

    put = (options: FetchOptions): Promise<FetchResponse> => {
        options.method = ReqMethod.PUT;
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
        let {serializeType, data, method, queryPrams, url, headers} = options;


        if (method === ReqMethod.GET) {
            //处理查询参数
            let queryParams = {
                ...data,
                ...queryPrams
            };
            options.url = `${url}${url.endsWith("?") ? '&' : "?"}${stringify(queryParams)}`;
            delete options.data;
            delete options.queryPrams;

        } else if (method === ReqMethod.POST) {
            //POST请求
            if (serializeType === SerializeType.FORM_DATA) {
                //以表单的形式提交数据
                options.data = stringify(data);
            } else if (serializeType === SerializeType.JSON) {
                //json
                options.data = JSON.stringify(data);
            } else {
            }
        }

        const contentType = 'Content-Type';
        switch (serializeType) {
            case SerializeType.FORM_DATA:
                headers[contentType] = MediaType.FORM_DATA;
                break;
            case SerializeType.JSON:
                headers[contentType] = MediaType.JSON;
                break;
            case SerializeType.NONE:
                break;
            default:
                //默认以表单的形式提交数据
                headers[contentType] = MediaType.FORM_DATA;
        }

        return options;

    }


}
