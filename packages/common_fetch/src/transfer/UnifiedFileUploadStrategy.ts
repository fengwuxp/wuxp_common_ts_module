import {FileUploadOptions, UploadFileType} from "./FileTransmitter";
import AbstractCacheFileUploadStrategy from "./AbstractCacheFileUploadStrategy";
import {FetchOptions} from "../FetchOptions";


/**
 * 统一的文件上传处理
 * @param data base64字符串或二进制对象
 */
type UnifiedFileUploadHandle = (data: UploadFileType) => Promise<string>;

/**
 * 统一的文件上传策略
 * 这种策略适合于服务端有统一的文件上传服务，进行统一的验证，上传，响应解析等
 */
export default class UnifiedFileUploadStrategy extends AbstractCacheFileUploadStrategy {

    //文件上传处理者
    private uploadHandle: UnifiedFileUploadHandle;


    constructor(uploadHandle: UnifiedFileUploadHandle, inspectionInterval?: number, maxTimes?: number) {
        super(inspectionInterval, maxTimes);
        this.uploadHandle = uploadHandle;
    }

    uploadFile = (options: FileUploadOptions): Promise<string> => {
        return this.uploadHandle(options.data);
    };

    protected buildUploadFileRequest: (options: FileUploadOptions) => Promise<FetchOptions>;




}