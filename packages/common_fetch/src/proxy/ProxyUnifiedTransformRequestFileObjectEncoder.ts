import {RequestDataEncoder} from './RequestDataEncoder';
import {FileUploadStrategy} from "../transfer/FileTransmitter";


/**
 * 在代理中统一上传文件对象的的encoder，仅支持web端
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
        if (typeof File === "undefined" || typeof Blob === "undefined") {
            return request;
        }

        //找出要上传的文件对象，加入到上传的队列中
        const uploadQueue: Array<{
            key: string,
            value: Promise<any>[]
        }> = [];
        for (const key in request) {
            const val = request[key];
            if (val == null) {
                continue;
            }
            uploadQueue.push({
                key,
                value: [val]
            });
        }
        if (uploadQueue.length > 0) {
            await Promise.all(uploadQueue.map(async ({key, value}) => {
                //并发上传文件
                const val = value[0];
                if (val.constructor === Array) {
                    return {
                        key,
                        value: await Promise.all((val as any).map((item) => {
                            return this.uploadFile(item);
                        }))
                    }
                }
                return {
                    key,
                    value: await this.uploadFile(val)
                }
            })).then((values) => {
                values.forEach(({key, value}) => {

                    //覆盖参数值，文件对象--> 远程url
                    request[key] = value;
                });
            });
        }

        return request;
    };

    private async uploadFile(value): Promise<any> {
        //判断请求参数是否存在文件对象

        if (value.constructor === File || value.constructor === Blob) {
            //上传
            return await this.fileUploadStrategy.upload({
                data: value
            });
        }

        return value;

    }


}