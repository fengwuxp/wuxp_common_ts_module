import AbstractCacheFileUploadStrategy from "./AbstractCacheFileUploadStrategy";
import {FileUploadOptions} from "./FileTransmitter";
import {RestTemplate} from "../template/RestTemplate";
import {FetchOptions} from "../FetchOptions";
import {fileToBase64} from "../../../common_utils/src/codec/FileConverterUtil";
import {MediaType} from "../constant/http/MediaType";


/**
 * 默认的文件上传策略
 * contentType == MediaType.FORM_DATA 时使用表单上传
 * contentType == null || contentType === MediaType.JSON     时使用base64字符串上传
 *
 */
export default class DefaultFileUploadStrategy extends AbstractCacheFileUploadStrategy {


    /**
     * 上传url
     */
    protected url: string;

    /**
     * rest template
     */
    protected restTemplate: RestTemplate;


    constructor(url: string, restTemplate: RestTemplate, inspectionInterval?: number, maxTimes?: number) {
        super(inspectionInterval, maxTimes);
        this.url = url;
        this.restTemplate = restTemplate;
    }

    protected uploadFile = (options: FileUploadOptions): Promise<string> => {
        //TODO　加入文件压缩
        let file: Promise<any>;
        const {data, contentType, formDataFileName} = options;
        if (typeof data !== "string") {
            if (typeof window === "undefined") {
                throw new Error("File or Blob only support browser");
            }
            if (contentType === MediaType.FORM_DATA) {
                //使用表单
                const formData = new FormData();
                formData.append(formDataFileName || "file", data as Blob);
                file = Promise.resolve(formData);
            } else if (contentType == null || contentType === MediaType.JSON) {
                //使用 json
                file = fileToBase64(data);
            }

        } else {
            file = Promise.resolve(data);
        }
        return file.then((base64) => {

            //使用 rest template 上传文件，可用共享接口统一处理逻辑
            return this.restTemplate.fetch({
                ...options,
                data: base64,
                url: options.url || this.url
            } as FetchOptions).then((data) => {
                if (typeof data === "string") {
                    return data;
                }
                return data["url"];
            })
        });
    };


}