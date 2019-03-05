import {WeexModule} from "weex";

export interface WeexScanQrCodeModule extends WeexModule {

    /**
     * zxing扫码
     * 扫码二维码
     * @param hiddenExchange 是否隐藏二维码/条码切换（0，false;1,true）
     * @param hiddenImportPhoto 是否隐藏导入图片（0，false;1,true）
     * @param success
     * @param error
     */
    scanWithZXing: (hiddenExchange: number, hiddenImportPhoto: number, success: (result: string) => void, error: () => void) => void;


    /**
     * 使用zbar扫码
     * 扫码二维码
     * @param hiddenExchange 是否隐藏二维码/条码切换（0，false;1,true）
     * @param hiddenImportPhoto 是否隐藏导入图片（0，false;1,true）
     * @param success
     * @param error
     */
    scanWithZbar: (hiddenExchange: number, hiddenImportPhoto: number, success: (result: string) => void, error: () => void) => void;
}