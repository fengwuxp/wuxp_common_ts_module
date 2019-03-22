import AbstractCacheFileUploadStrategy from "./AbstractCacheFileUploadStrategy";
import {FileUploadOptions} from "./FileTransmitter";
import {RestTemplate} from "../template/RestTemplate";
import {FetchOptions} from "../FetchOptions";
import {fileToBase64} from "common_utils/src/codec/FileConverterUtil";
import {MediaType} from "../constant/http/MediaType";
import AppConfigRegistry from "common_config/src/app/AppConfigRegistry";
import {defaultApiModuleName} from "../constant/FeignConstVar";


/**
 * 默认的文件上传策略
 * contentType == MediaType.FORM_DATA 时使用表单上传
 * contentType == null || contentType === MediaType.JSON_UTF8     时使用base64字符串上传
 *
 */
export default class DefaultFileUploadStrategy extends AbstractCacheFileUploadStrategy {


    /**
     * rest template
     */
    protected restTemplate: RestTemplate;

    /**
     * 默认的文件上传配置
     */
    protected defaultFileOptions: FileUploadOptions;


    constructor(restTemplate: RestTemplate, defaultFileOptions?: FileUploadOptions, inspectionInterval?: number, maxTimes?: number) {
        super(inspectionInterval, maxTimes);
        this.restTemplate = restTemplate;
        const appConfig = AppConfigRegistry.get();
        this.defaultFileOptions = defaultFileOptions || {
            url: appConfig != null ? appConfig.uploadFileURL : (process.env.UNIFIED_UPLOAD_FILE_URL || `@${defaultApiModuleName}/system/upload`),
            contentType: MediaType.JSON_UTF8,
            formDataFileName: "file"
        } as FileUploadOptions;
    }

    protected uploadFile = (options: FileUploadOptions): Promise<string> => {

        return this.buildUploadFileRequest(options).then((fetchOptions: FetchOptions) => {

            console.log("上传文件", fetchOptions);
            //使用 rest template 上传文件，可用共享接口统一处理逻辑
            return this.restTemplate.fetch(fetchOptions).then((data) => {
                if (typeof data === "string") {
                    return data;
                }
                return data["url"];
            });
        });
    };


    protected buildUploadFileRequest = (options: FileUploadOptions): Promise<FetchOptions> => {
        //TODO　加入文件压缩
        const fetchOptions = {
            ...options,
            ...this.defaultFileOptions
        };
        const {data, contentType, formDataFileName} = fetchOptions;
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
                return Promise.resolve({
                    ...fetchOptions,
                    data: formData
                });
            } else if (contentType == null || contentType === MediaType.JSON_UTF8) {
                //使用 json
                return fileToBase64(blob).then((base64) => {
                    const result = {
                        //文件扩展名称
                        extName: extName
                    };
                    result[name] = base64.split(",")[1];
                    return {
                        ...fetchOptions,
                        data: result
                    }
                });
            }

        } else {
            return Promise.resolve({
                ...fetchOptions,
                data
            });
        }
    };


}