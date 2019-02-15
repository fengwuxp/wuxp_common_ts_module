import {RequestDataEncoder} from './RequestDataEncoder';
import {FileUploadStrategy} from "../transfer/FileTransmitter";


/**
 * 在代理中统一上传文件对象的的encoder
 */
export class ProxyUnifiedTransformRequestFileObjectEncoder implements RequestDataEncoder {

    /**
     * 文件上传策略
     */
    private fileUploadStrategy: FileUploadStrategy;


    constructor(fileUploadStrategy: FileUploadStrategy) {
        this.fileUploadStrategy = fileUploadStrategy;
    }

    async encode(request: any): Promise<any> {
        //判断请求参数是否存在文件对象
        for (const key in request) {
            const val = request[key];
            if (val == null) {
                continue;
            }
            if (val.constructor === File || val.constructor === Blob) {
                //文件对象
                try {
                    //上传并覆盖原始参数
                    request[key] = await this.fileUploadStrategy.upload({
                        data: val
                    });
                } catch (e) {
                    //上传文件失败
                    console.error(e);
                }

            }
        }

        return request;
    };


}