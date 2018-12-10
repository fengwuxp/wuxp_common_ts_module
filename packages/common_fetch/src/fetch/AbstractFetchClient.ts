import {FetchClient} from "./FetchClient";
import {FetchOptions, FetchResponse} from "../FetchOptions";
import {ReqequestMethod} from "../constant/ReqequestMethod";
import {FetchAdapter} from "../adapter/FetchAdapter";
//promise 扩展
import "../fetch.promise";


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

    request = (options: T): Promise<FetchResponse> => {

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
    protected abstract handleFetchOptions: (options: T) => T;


}