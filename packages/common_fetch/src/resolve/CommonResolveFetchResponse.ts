import {ResolveFetchResponse} from "./ResolveFetchResponse";
import {FetchResponse} from "../FetchOptions";

/**
 * 通用的响应数据解析
 */
export default class CommonResolveFetchResponse implements ResolveFetchResponse<Response> {


    resolve = (resp: Response): FetchResponse => {

        const {headers, ok, status} = resp;

        return {
            data: resp['data'],
            headers,
            ok,
            status,
            statusText: resp["statusText"] || null
        }
    };


}
