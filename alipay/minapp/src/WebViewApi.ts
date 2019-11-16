import {Printer, TicketType} from "./Printer";

export interface PrintOptions {

}

export interface PayOptions {

    /**
     *  0刷脸，1扫码
     */
    payType: 0 | 1;

    /**
     * 支付金额 元
     */
    totalPrice: number;
}

/**
 * 提供给webview的能力
 */
export interface WebViewApi extends Printer {

    /**
     * 调用支付
     * @param args
     */
    callPay: (payOptions: PayOptions) => Promise<any>;

    /**
     * 交接班退出
     */
    callLoginOutAfterClassExchange: () => void;

}

