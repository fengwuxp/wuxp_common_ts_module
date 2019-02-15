import AbstractCacheFileUploadStrategy from "./AbstractCacheFileUploadStrategy";
import {FileUploadOptions} from "./FileTransmitter";
import {RestTemplate} from "../template/RestTemplate";
import {FetchOptions} from "../FetchOptions";
import {fileToBase64} from "../../../common_utils/src/codec/FileConverterUtil";


/**
 * 默认的文件上传策略
 * 使用 base64的格式上传文件
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

        let file: Promise<string>;
        const data = options.data;
        if (typeof data !== "string") {
            if (typeof window === "undefined") {
                throw new Error("File or Blob only support browser");
            }
            //web端
            file = fileToBase64(data);
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