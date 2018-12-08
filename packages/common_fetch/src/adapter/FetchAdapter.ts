import {FetchOptions, FetchResponse} from "../FetchOptions";

/**
 * fetch 适配器
 */
export interface FetchAdapter<T extends FetchOptions = FetchOptions> {

    /**
     * 请求
     * @param options 请求配置
     * @return Promise<FetchResponse>
     */
    request: (options: T) => Promise<FetchResponse>;
}