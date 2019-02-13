import {FileUploadOptions, FileUploadStrategy} from "./FileTransmitter";


/**
 * 统一的文件上传处理
 * @param data base64字符串或二进制对象
 */
type UnifiedFileUploadHandle = (data: string | Blob) => Promise<string>;

/**
 * 统一的文件上传策略
 * 这种策略适合于服务端有统一的文件上传服务，进行统一的验证，上传，响应解析等
 */
export default class UnifiedFileUploadStrategy implements FileUploadStrategy {

    private uploadHandle: UnifiedFileUploadHandle;


    constructor(uploadHandle: UnifiedFileUploadHandle) {
        this.uploadHandle = uploadHandle;
    }

    upload = (options: FileUploadOptions): Promise<string> => {
        return this.uploadHandle(options.data);
    };


}