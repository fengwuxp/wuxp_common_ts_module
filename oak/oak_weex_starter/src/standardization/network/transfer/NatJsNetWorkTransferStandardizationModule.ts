import {
    NetworkDownloadOptions,
    NetworkUploadOptions,
    WeexNetworkTransferStandardizedModule
} from "./WeexNetworkTransferStandardizedModule";
import {standardizedWeexModuleToPromise} from "common_weex/src/sdk/standardization/StandardizationHelper";
import {natJsNetWorkTransferModule} from "../../../natjs/network";




const emptyProgress = (speed) => {
};


/**
 * 基于natjs标准化的网络传输模块
 */
export const ntJsWorkTransferStandardizedModule: WeexNetworkTransferStandardizedModule = standardizedWeexModuleToPromise({
    module: natJsNetWorkTransferModule,
    transformParamMap: {
        download: (options: NetworkDownloadOptions) => {
            const headers = options.headers || {};
            const onProgress = options.onProgress || emptyProgress;

            return [
                options.url,
                {
                    headers
                },
                {
                    onProgress
                }
            ];
        },
        upload: (options: NetworkUploadOptions) => {
            const headers = options.headers || {};
            const formData = options.formData || {};
            const onProgress = options.onProgress || emptyProgress;
            return [
                options.url,
                {
                    path: options.localFilePath,
                    headers,
                    formData,
                    name: options.name,
                    mimeType: options.mimeType,
                    method: options.method,
                },
                {
                    onProgress
                }
            ];
        }
    },
    transformCallbackMap: {
        upload: (resolve, reject) => {

            return [
                (error, result) => {
                    if (result.ok) {
                        resolve(result.data)
                    } else {
                        resolve(error, result)
                    }
                }
            ]
        },
        download: (resolve, reject) => {

            return [
                (error, result) => {
                    if (result.ok) {
                        resolve(result.data)
                    } else {
                        resolve(error, result)
                    }
                }
            ]
        }
    }


});