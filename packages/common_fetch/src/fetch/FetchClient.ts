import {FetchOptions, FetchResponse} from "./FetchOptions";


export interface FetchClient {


    fetch: (options: FetchOptions) => Promise<FetchResponse>;
}