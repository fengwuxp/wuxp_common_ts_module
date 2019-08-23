import {FetchResponse} from "../../FetchOptions";
import {ResponseType} from "../../constant/ResponseType";
import {WebFetchOptions} from "./WebFetchOptions";
import {RequestMethod} from "../../constant/RequestMethod";
import AbstractFetchAdapter from "../AbstractFetchAdapter";
import {MediaType} from "../../constant/http/MediaType";
import {contentTypeName} from "../../constant/FeignConstVar";


// RequestInit 属性name列表
const RequestInitAttrNames: string[] = [
    "referrer",
    "referrerPolicy",
    "credentials",
    "redirect",
    "cache",
    "integrity",
    "keepalive",
    "window"
];

/**
 * web端fetchAdapter
 */
export default class WebFetchAdapter extends AbstractFetchAdapter<WebFetchOptions> {


    request = (options: WebFetchOptions): Promise<FetchResponse> => {

        return new Promise((resolve, reject) => {

            const p = fetch(this.buildRequest(options)).then((response: Response) => {
                return this.parse(response, options.responseType).then((data) => {
                    //为了适配
                    response['data'] = data;
                    return this.resolveResponse.resolve(response)
                });
            }).catch((response: Response) => {
                const data = this.resolveResponse.resolve(response);
                data.data = response;
                return Promise.reject(data);
            });
            //超时控制
            const timeId = setTimeout(() => {
                //丢弃请求
                console.debug("web fetch adapter request timeout");
                reject({
                    status: 502,
                    headers: null,
                    data: null,
                    ok: false,
                    statusText: `request timeout`
                });
            }, options.timeout || 5000);

            p.finally((data) => {
                //清除定时器
                clearTimeout(timeId);
                return data;
            }).then(resolve)
                .catch(reject);
        })

    };


    /**
     * 构建请求对象
     * @param {WebFetchOptions} options
     * @return {Request}
     */
    private buildRequest(options: WebFetchOptions): RequestInfo {
        let {
            contentType,
            url,
            method,
            headers,
            data,
            mode
        } = options;


        if (contentType === MediaType.MULTIPART_FORM_DATA) {
            //移除
            //@link https://segmentfault.com/a/1190000010205162
            delete headers[contentTypeName];
        }

        const reqMethodElement = RequestMethod[method];

        //构建Request请求对象
        const reqOptions = {
            method: reqMethodElement,
            headers,
            body: data,
            mode
        } as RequestInit;

        RequestInitAttrNames.forEach((name) => {
            const attr = options[name];
            if (attr == null) {
                return;
            }
            reqOptions[name] = attr;
        });
        return new Request(url, reqOptions);
    }


    /**
     * 格式化数据
     * @param response
     * @param dataType
     * @return {any}
     */
    private parse(response: Response, dataType: ResponseType): Promise<any> {

        if (!response.ok) {
            return Promise.reject(null);
        }

        //TODO 请求进度
        switch (dataType) {
            case ResponseType.JSON:
                return this.parseJSON(response);
            case ResponseType.TEXT:
                return this.parseText(response);
            case ResponseType.HTML:
                return this.parseText(response);
            case ResponseType.SCRIPT:
                return this.parseJSON(response);
            case ResponseType.BLOB:
                return this.paresBlob(response);
            default:
                const error = new Error(`不支持的结果数据类型： ${dataType}`);
                error['response'] = response;
                throw error;
        }

    }

    private parseJSON(response: Response): Promise<any> {
        return response.json();
    }

    private parseText(response: Response): Promise<string> {
        return response.text();
    }

    private paresArrayBuffer(response: Response): Promise<ArrayBuffer> {
        return response.arrayBuffer();
    }

    private paresBlob(response: Response): Promise<Blob> {
        return response.blob();
    }

    private paresFormData(response: Response): Promise<FormData> {
        return response.formData();
    }
}
