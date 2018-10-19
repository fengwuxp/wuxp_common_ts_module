import {ResolveFetchData} from "./ResolveFetchData";
import {FetchResponse} from "../fetch/FetchOptions";

/**
 * 通用的响应数据解析
 */
export default class CommonResolveFetchData implements ResolveFetchData<Response> {


    resolve = (resp: Response): FetchResponse => {

        const {headers, ok, status, statusText} = resp;

        return {
            data: resp['data'],
            headers,
            ok,
            status,
            statusText
        }
    };


}
