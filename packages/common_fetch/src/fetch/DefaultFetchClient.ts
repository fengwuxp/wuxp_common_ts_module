import {FetchAdapter} from "../adapter/FetchAdapter";
import {FetchOptions, FetchResponse} from "../FetchOptions";
import AbstractFetchClient from "./AbstractFetchClient";


/**
 * 默认的 fetch client实现
 */
export default class DefaultFetchClient extends AbstractFetchClient<FetchOptions> {


    constructor(fetchAdapter: FetchAdapter) {
        super(fetchAdapter)
    }


    request = this.fetch


}
