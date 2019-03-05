import {qrcode} from "../../ExpotrtWeexOAKModel";
import {WeexStandardizeLocationModule} from "../location/WeexStandardizeLocationModule";
import {standardizedWeexModuleToPromise} from "common_weex/src/sdk/standardization/StandardizationHelper";

export interface WeexStandardizeScanQrCodeModule {

    /**
     * ZXing扫码
     * 扫码二维码
     * @param options
     */
    scanWithZXing: (options?: WeexStandardizeScanQrCodeOptions) => Promise<string>;

    /**
     * ZBar扫码
     * @param options
     */
    scanWithZbar: (options?: WeexStandardizeScanQrCodeOptions) => Promise<string>;
}

export interface WeexStandardizeScanQrCodeOptions {

    /**
     * 是否隐藏二维码/条码切换
     */
    hiddenExchange?: boolean;

    /**
     * 是否隐藏导入图片
     */
    hiddenImportPhoto?: boolean;
}

const defaultOptions = {hiddenExchange: false, hiddenImportPhoto: false};
const scanWithZXing = (options: WeexStandardizeScanQrCodeOptions = defaultOptions) => {
    const {hiddenExchange, hiddenImportPhoto} = {
        ...defaultOptions,
        ...options
    };
    return [
        hiddenExchange ? 1 : 0,
        hiddenImportPhoto ? 1 : 0,
    ];
};
/**
 * 标准化的扫码模块
 */
export default standardizedWeexModuleToPromise<WeexStandardizeLocationModule>({
    module: qrcode,
    transformParamMap: {
        scanWithZXing,
        scanWithZbar: scanWithZXing
    },
    transformCallback: (resolve, reject) => [
        resolve,
        reject
    ]
});
