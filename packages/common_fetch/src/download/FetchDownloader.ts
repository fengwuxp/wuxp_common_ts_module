import FileSaver from "file-saver";
import StringUtils from "fengwuxp_common_utils/src/string/StringUtils";
import DefaultFetchClient from '../fetch/DefaultFetchClient';
import WebFetchAdapter from "../adapter/web/WebFetchAdapter";
import {FetchOptions} from "../FetchOptions";
import {HttpMediaType} from "../constant/http/HttpMediaType";
import {contentTypeName} from "../constant/FeignConstVar";


const fetchClient = new DefaultFetchClient(new WebFetchAdapter());


/**
 * 下载文件
 * 注：使用时注意跨域的限制
 * @param {FetchOptions} options
 * @param {string} fileName
 * @returns {Promise<any>}
 */
export function downloadFile(options: FetchOptions, fileName?: string) {

    if (!StringUtils.hasText(fileName)) {
        const url = options.url;
        fileName = url.substring(url.lastIndexOf("/"), url.length);
    }

    const headers = {};
    headers[contentTypeName] = HttpMediaType.STREAM;

    return fetchClient.post({
        headers,
        ...options,
    }).then((response) => {
        if (!response.ok) {
            return Promise.reject(response);
        }
        //保存文件
        FileSaver.saveAs(response.data, fileName);
    });
}
