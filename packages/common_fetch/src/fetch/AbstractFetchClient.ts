import {FetchClient} from "./FetchClient";
import {FetchOptions, FetchResponse} from "../FetchOptions";
import {ReqequestMethod} from "../constant/ReqequestMethod";
import {FetchAdapter} from "../adapter/FetchAdapter";


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

        return this.fetchAdapter.request(this.handleFetchOptions(options));
    };


    protected abstract handleFetchOptions: (options: T) => T;


}