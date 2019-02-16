import {BaseFetchOptions} from "../BaseFetchOptions";
import {FetchAdapter} from "../adapter/FetchAdapter";
import DefaultFetchClient from "../fetch/DefaultFetchClient";


/**
 * 在使用application/json提交数据时使用
 */
interface RequestBody {

    [key: string]: any;
}

/**
 * 文件上传的配置对象
 */
export interface FileUploadOptions extends BaseFetchOptions {

    data: string | RequestBody | File | Blob;

    /**
     * 以表单形式或单纯的base64字符串提交文件时，服务端接收参数的名称,
     * 默认 file
     */
    formDataFileName?: string

}

/**
 * 文件下载配置
 */
export interface FileDownloadOptions {

    url: string;

    fileName?: string;
}


/**
 * 文件上传策略
 */
export interface FileUploadStrategy {

    /**
     * 文件上传
     * @param data
     * @param url
     */
    upload: (options: FileUploadOptions) => Promise<string>;
}


/**
 * 文件下载策略
 */
export interface FileDownloadStrategy {

    /**
     * 文件下载
     * @param downloadUrl
     */
    download: (options: FileDownloadOptions | string) => Promise<Blob>

}


/**
 * 文件传输者
 */
export interface FileTransmitter extends FileUploadStrategy, FileDownloadStrategy {
}


// /**
//  * 抽象的文件传输者
//  */
// export abstract class AbstractFileTransfer extends DefaultFetchClient implements FileTransmitter {
//
//
//
//     constructor(fetchAdapter: FetchAdapter) {
//         super(fetchAdapter);
//     }
//
//     download = (options: FileDownloadOptions): Promise<Blob> => {
//
//
//         this.post({
//             url:options.url
//         }).then(()=>{
//
//         });
//         return null
//
//     };
//
//     upload = (options: FileUploadOptions): Promise<string> => {
//         return null
//     };
//
//
// }