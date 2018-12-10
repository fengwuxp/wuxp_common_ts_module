import {FetchAdapter} from "../adapter/FetchAdapter";
import {FetchOptions} from "../FetchOptions";
import {ReqequestMethod} from "../constant/ReqequestMethod";
import {stringify} from "querystring";
import {MediaType} from "../constant/http/MediaType";
import AbstractFetchClient from "./AbstractFetchClient";

const contentTypeName = 'Content-Type';

/**
 * 默认的 fetch client实现
 */
export default class DefaultFetchClient extends AbstractFetchClient<FetchOptions> {


    constructor(fetchAdapter: FetchAdapter) {
        super(fetchAdapter)
    }


    /**
     * 处理请求参数
     * @param options
     */
    protected handleFetchOptions = (options: FetchOptions) => {
        options.headers = options.headers || {};
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
                headers[contentTypeName] = (contentType || MediaType.FORM_DATA);
            }
        }

        console.debug("发起请求", options);
        return options;

    }


}
