import {WeexModule} from "weex";

interface TransferResult {
    status: number;
    statusText: string;
    ok: boolean;
    headers: string
    data: string
}

/**
 * http://natjs.com/#/reference/network/transfer
 * natjs 网络传输 module
 */

export interface NatJsNetWorkTransferModule extends WeexModule {

    /**
     * 下载
     * @param url
     * @param options
     * @param hooks
     * @param callback
     */
    download: (
        url: string,
        options: {
            headers?: Headers,
            target?: string
        },
        hooks: {
            onProgress: (progressing: number) => void;
        },
        callback: (err: string,
                   result: TransferResult) => {}
    ) => void;


    /**
     * 上传
     * @param url
     * @param options
     * @param hooks
     * @param callback
     */
    upload: (url: string,
             options: {
                 path: string,
                 method?: "POST" | "PUT" | "PATCH",
                 headers?: object,
                 name?: string,
                 formData?: FormData,
                 mimeType?: string
             },
             hooks: {
                 onProgress: (progressing: number) => void;
             },
             callback: (err: string,
                        result: TransferResult) => void
    ) => void;
}