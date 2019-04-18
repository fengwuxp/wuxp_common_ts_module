import {RequestDataEncoder} from '../codec/RequestDataEncoder';
import {FileUploadStrategy} from "../transfer/FileTransmitter";
import {NeedAutoUploadOptions} from "../annotations/upload/AutoUpload";
import {FeignProxyApiServiceMethodConfig} from "./feign/FeignProxy";
import {FetchOptions} from "../FetchOptions";
import {RequestMethod} from "../constant/RequestMethod";


/**
 * 在代理中统一上传文件对象的的encoder，仅支持web端
 */
export class ProxyUnifiedTransformRequestFileObjectEncoder implements RequestDataEncoder {

    /**
     * 文件上传策略
     */
    private fileUploadStrategy: FileUploadStrategy;

    /**
     * 是否为web 环境
     */
    private isWeb: boolean = typeof File !== "undefined" || typeof Blob !== "undefined";

    /**
     * 支持的请求方法列表
     */
    private supportRequestMethods = [RequestMethod.POST, RequestMethod.PATCH, RequestMethod.PUT];


    constructor(fileUploadStrategy: FileUploadStrategy) {
        this.fileUploadStrategy = fileUploadStrategy;
    }


    async encode(request: any, config: FeignProxyApiServiceMethodConfig): Promise<any> {


        //找出要上传的文件对象，加入到上传的队列中
        const uploadQueue: Array<{
            key: string,
            value: Promise<any>[]
        }> = [];
        for (const key in request) {
            const val = request[key];
            if (this.attrIsNeedUpload(key, val, config.autoUploadOptions)) {
                uploadQueue.push({
                    key,
                    value: [val]
                });
            }

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


    needExecute = (options: FetchOptions, config: FeignProxyApiServiceMethodConfig) => {


        return this.supportRequestMethods.indexOf(options.method) >= 0;

    };


    /**
     * 该属性是否需要进行文件上传
     * @param key
     * @param value
     * @param options
     */
    private attrIsNeedUpload = (key: string, value, options: NeedAutoUploadOptions): boolean => {
        if (value == null) {
            return false;
        }

        if (this.isWeb) {
            //判断请求参数是否存在文件对象
            if (value.constructor === File || value.constructor === Blob) {
                return true;
            }
        }

        //是否在需要上传的列表中
        if (options != null && options.fields != null) {
            if (options.fields.findIndex((field) => field === key)) {
                return true;
            }
        }

        return false;

    };

    /**
     * 上传
     * @param value
     */
    private uploadFile = (value): Promise<any> => this.fileUploadStrategy.upload({
        data: value
    })


}