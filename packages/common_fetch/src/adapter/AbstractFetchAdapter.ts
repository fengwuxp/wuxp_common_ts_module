import {FetchAdapter} from "./FetchAdapter";
import {FetchOptions, FetchResponse} from "../FetchOptions";
import {ResolveFetchResponse} from "../resolve/ResolveFetchResponse";
import CommonResolveFetchResponse from "../resolve/CommonResolveFetchResponse";
//promise 扩展
import "../fetch.promise";
/**
 *  abstract fetch adapter
 */
export default abstract class AbstractFetchAdapter<T extends FetchOptions = FetchOptions> implements FetchAdapter<T> {


    protected resolveResponse: ResolveFetchResponse;


    constructor(resolveResponse: ResolveFetchResponse = new CommonResolveFetchResponse()) {
        this.resolveResponse = resolveResponse;
    }

    abstract request: (options: T) => Promise<FetchResponse>;


}