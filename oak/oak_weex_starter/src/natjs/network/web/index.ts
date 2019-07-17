import {isWeb} from "fengwuxp_common_weex/src/constant/WeexEnv";
import {NatJsNetWorkTransferModule, TransferResult} from "../NatJsNetWorkTransferModule";


if (isWeb) {

    const netWorkTransferModule: NatJsNetWorkTransferModule = {
        /** 下载
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
        ) => {
            console.log("web 端暂不支持，下载url", url)
        },


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
        ) => {
            console.log("web 端暂不支持，上传url", url)
        }

    }
    console.log("注册自定义模块 nat_network_transfer");
    weex.registerModule('nat_network_transfer', netWorkTransferModule);
}
