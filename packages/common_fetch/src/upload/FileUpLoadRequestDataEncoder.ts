import {RequestDataEncoder} from "../codec/RequestDataEncoder";
import {FetchOptions} from "../FetchOptions";
import {FeignProxyApiServiceMethodConfig} from "../proxy/feign/FeignProxy";
import {contentTypeName} from '../constant/FeignConstVar';
import {HttpMediaType} from '../constant/http/HttpMediaType';
import {isBrowser} from "../utils/EvnAndTypeUtil";


/**
 * 文件上传编码
 * 仅支持浏览器端
 */
export default class FileUpLoadRequestDataEncoder implements RequestDataEncoder {


    encode = (request: any, ...otherArgs): Promise<any> => {

        const formData = new FormData();
        for (const key in request) {
            formData.append(key, request[key]);
        }
        return Promise.resolve(formData);
    };


    needExecute = (options: FetchOptions, config: FeignProxyApiServiceMethodConfig): boolean => {
        const contentType = options.contentType || options.headers[contentTypeName];
        const b = contentType !== HttpMediaType.MULTIPART_FORM_DATA || !isBrowser();
        if (b) {
            return false;
        }

        return true;
    }


}
