import {WeexStandardizedModule} from "common_weex/src/sdk/standardization/WeexStandardizedModule";


/**
 * 网络传输
 */
export interface WeexNetworkTransferStandardizedModule extends WeexStandardizedModule {


    /**
     * 文件上传
     * @param options
     */
    upload: (options: NetworkUploadOptions) => Promise<string>;

    /**
     * 文件下载
     * @param options
     */
    download: (options: NetworkDownloadOptions) => Promise<string>;

}

interface BaseOptions {

    onProgress?: (speed: number) => void;

    headers?: object;

}

export interface NetworkUploadOptions extends BaseOptions {

    /**
     * 上传目标路径
     */
    url: string;

    /**
     * 本地文件路径
     */
    localFilePath: string;


    method?: "POST" | "PUT" | "PATCH",

    name?: string,

    formData?: FormData,

    mimeType?: string


}

export interface NetworkDownloadOptions extends BaseOptions {

    /**
     * 文件下载路径
     */
    url: string;


}