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

    /**
     * 默认的文件上传配置
     */
    protected defaultFileOptions: FileUploadOptions;


    constructor(url: string, restTemplate: RestTemplate, defaultFileOptions?: FileUploadOptions, inspectionInterval?: number, maxTimes?: number) {
        super(inspectionInterval, maxTimes);
        this.url = url;
        this.restTemplate = restTemplate;
        this.defaultFileOptions = defaultFileOptions || {
            contentType: MediaType.JSON,
            formDataFileName: "file"
        } as FileUploadOptions;
    }

    protected uploadFile = (options: FileUploadOptions): Promise<string> => {

        return this.buildUploadFileRequest(options).then((requestData) => {

            //使用 rest template 上传文件，可用共享接口统一处理逻辑
            return this.restTemplate.fetch({
                ...options,
                data: requestData,
                url: options.url || this.url
            } as FetchOptions).then((data) => {
                if (typeof data === "string") {
                    return data;
                }
                return data["url"];
            })
        });
    };


    protected buildUploadFileRequest = (options: FileUploadOptions): Promise<any> => {
        //TODO　加入文件压缩
        const {data, contentType, formDataFileName} = {
            ...options,
            ...this.defaultFileOptions
        };
        if (data.constructor === File || data.constructor === Blob) {
            if (typeof window === "undefined") {
                throw new Error("File or Blob only support browser");
            }
            const name = formDataFileName;
            const blob = data as Blob;
            const extName = blob.type.split("/")[0];
            if (contentType === MediaType.FORM_DATA) {
                //使用表单
                const formData = new FormData();
                formData.append(name, blob);
                formData.append("extName", extName);
                return Promise.resolve(formData);
            } else if (contentType == null || contentType === MediaType.JSON) {
                //使用 json
                return fileToBase64(blob).then((base64) => {
                    const result = {
                        //文件扩展名称
                        extName: extName
                    };
                    result[name] = base64;
                    return result
                });
            }

        } else {
            return Promise.resolve(data);
        }
    };


}