import {FetchAdapter} from "../FetchAdapter";
import {FetchOptions, FetchResponse} from "../../FetchOptions";
import {WeexStreamModule, WeexStreamOption, WeexStreamResponse} from "weex/src/sdk/model/stream";
import {ReqequestMethod} from "../../constant/ReqequestMethod";
import {ResolveFetchData} from "../../resolve/ResolveFetchData";
import CommonResolveFetchData from "../../resolve/CommonResolveFetchData";


const stream: WeexStreamModule = weex.requireModule('stream');

/**
 * weex 请求适配器
 */
export class WeexAdapter implements FetchAdapter {


    /**
     * 解析请求结果数据
     */
    private resolveFetchData: ResolveFetchData = new CommonResolveFetchData();


    request = (options: FetchOptions): Promise<FetchResponse> => {

        //TODO 进行请求
        //返回统一的数据结果

        const req = this.buildRequest(options);

        return new Promise<FetchResponse>((resolve, reject) => {
            stream.fetch(req, (resp: WeexStreamResponse) => {
                //解析数据
                const data = this.resolveFetchData.resolve(resp);
                if (resp.ok) {
                    resolve(data);
                } else {
                    data.data = resp;
                    reject(data);
                }
            }, (response) => {

                let requestProgress = options.requestProgress;
                if (typeof requestProgress === "function") {
                    return;
                }

                //请求进度
                // requestProgress(response);
            });
        });


    };


    private buildRequest = (reqParams: FetchOptions): WeexStreamOption => {
        let {
            url,
            data,
            method,
            dataType,
            headers
        } = reqParams;

        headers = headers || {};

        //WEEX stream对象 https://weex.apache.org/cn/references/modules/stream.html

        let reqMethod = ReqequestMethod[method];

        return {
            //请求方法get post
            method: reqMethod,
            //请求url
            url,
            //响应类型, json,text 或是 jsonp {在原生实现中其实与 json 相同)
            type: dataType.toString().toLowerCase(),
            //headers HTTP 请求头
            headers,
            //参数仅支持 string 类型的参数，请勿直接传递 JSON，必须先将其转为字符串。GET请求不支持 body 方式传递参数，请使用 url 传参。
            body: (data == null || method === ReqequestMethod.GET) ? null : typeof data === "string" ? data : JSON.stringify(data)
        };
    }


}
