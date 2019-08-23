import AbstractFetchAdapter from "../AbstractFetchAdapter";
import {FetchResponse} from "../../FetchOptions";
import request from "request";
import {MediaType} from "../../constant/http/MediaType";
import {NodeFetchOptions} from "./NodeFetchOptions";
import StringUtils from "fengwuxp_common_utils/src/string/StringUtils";
import {ResponseType} from "../../constant/ResponseType";

/**
 * node fetch adapter
 */
export default class NodeFetchAdapter extends AbstractFetchAdapter<NodeFetchOptions> {


    request = (options: NodeFetchOptions): Promise<FetchResponse> => {

        const {url, method, responseType, headers, timeout, jar, auth, oauth} = options;

        return new Promise<FetchResponse>((resolve, reject) => {

            request({
                url,
                method,
                headers,
                jar,
                auth,
                oauth,
                timeout,
                ...this.buildOption(options)
            }, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    resolve(this.resolveResponse.resolve({
                        ok: true,
                        statusText: response.statusMessage,
                        status: response.statusCode,
                        headers: response.headers,
                        data: this.parse(response, responseType)
                    }));
                } else {
                    reject(this.resolveResponse.resolve({
                        ok: false,
                        statusText: error.message,
                        status: error.code
                    }));
                }
            });
        });
    };


    private buildOption = (options: NodeFetchOptions) => {

        const {contentType, data} = options;

        if (contentType === MediaType.FORM_DATA) {
            return {
                form: data
            }
        } else if (contentType === MediaType.JSON_UTF8 || contentType == MediaType.JSON_UTF8) {
            return {
                body: data
            }
        } else if (contentType === MediaType.MULTIPART_FORM_DATA) {
            return {
                formData: data
            }
        }

        return {};
    };

    /**
     * 格式化数据
     * @param response
     * @param dataType
     * @return {any}
     */
    private parse = (response: any, dataType: ResponseType): Promise<any> => {

        const body = response.body;

        switch (dataType) {
            case ResponseType.JSON:
                return StringUtils.hasText(body) ? JSON.parse(body) : null;
            case ResponseType.TEXT:
                return body;
            case ResponseType.HTML:
                return body;
            case ResponseType.SCRIPT:
                return body;
            case ResponseType.BLOB:
                return body;
            default:
                const error = new Error(`不支持的结果数据类型： ${dataType}`);
                error['response'] = response;
                throw error;
        }

    }
}