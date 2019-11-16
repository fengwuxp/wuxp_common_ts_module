import {TicketType} from "./Printer";
import {PayOptions, WebViewApi} from "./WebViewApi";


const generateCallbackFNName = (name: string) => {
    return `${name}_${parseInt((Math.random() * 100000).toString())}`
};

const commonHandleBack = (callbackId: string, resolve, reject) => {
    const callback = {
        resolve,
        reject
    };

    const callbackFn = (data) => {
        console.log("--android callback->", data);
        if (typeof data === "string") {
            try {
                callback.resolve(JSON.parse(data));
            } catch (e) {
                callback.resolve(data);
            }
        } else {
            callback.resolve(data);
        }
        delete window[callbackId];
    };
    const parentWindow = window.parent;
    if (parentWindow != null) {
        // iframe
        console.log("iframe");
        // parentWindow[callbackId]=callbackFn;
        parentWindow[callbackId] = function (data) {
            //调用
            console.log("---调用iframe中的回调->");
            callbackFn(data);
            delete parentWindow[callbackId];
            delete window[callbackId];
        }
    }
    window[callbackId] = callbackFn;
};

const outData = (data) => {
    return typeof data === "string" ? data : JSON.stringify(data);
};

export const getAndroidWebOpnApi = (): Promise<WebViewApi> => {

    // @ts-ignore
    const android = window.android;

    const webViewApi: WebViewApi = {
        callPay: function (payOptions: PayOptions) {
            return new Promise((resolve, reject) => {
                android.jsPay(JSON.stringify(payOptions));
                // @ts-ignore
                window.payResult = function (result) {
                    const resp = JSON.parse(result);
                    if (resp.result === "0") {
                        resolve(resp);
                    } else {
                        reject(resp);
                    }
                }
            });
        },

        callGetLocalPrinterList: function () {
            const callbackFNName = generateCallbackFNName("__GET_LOCAL_PRINT_CALLBACK___");
            return new Promise((resolve, reject) => {
                commonHandleBack(callbackFNName, resolve, reject);
                android.getLocalTicketPrinterList(callbackFNName);
            });
        },

        callPrintTicket: function (type: TicketType, data: any) {
            const callbackFNName = generateCallbackFNName("__PRINT__CALLBACK___");
            return new Promise<any>((resolve, reject) => {
                commonHandleBack(callbackFNName, resolve, reject);
                android.printTicket(type, outData(data), callbackFNName);
            });
        },

        callSetPrinter: function (type: TicketType, printers: any) {
            android.setTicketPrinters(type, outData(printers));
        },

        callLoginOutAfterClassExchange: function () {
            console.log("callLoginOutAfterClassExchange");
            android.loginOutAfterClassExchange("");
        }

    };

    return Promise.resolve(webViewApi)
};
