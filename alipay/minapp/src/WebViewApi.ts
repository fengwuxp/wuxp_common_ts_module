interface PrintOptions {

}

interface PayOptions {

    /**
     *  0刷脸，1扫码
     */
    payType: 0 | 1;

    /**
     * 支付金额 元
     */
    totalPrice: number;
}

export interface WebViewApi {

    /**
     * 调用打印
     * @param args
     */
    callPrint: (printOptions: PrintOptions) => Promise<any>;


    /**
     * 调用支付
     * @param args
     */
    callPay: (payOptions: PayOptions) => Promise<any>

}

/**
 * 获取web-view 开放api实例
 * @return Promise<WebViewApi>
 */
export const getWebOpenApiInstance = (): Promise<WebViewApi> => {

    // @ts-ignore
    if (window.android != null) {
        //安卓
        return getAndroidWebOpnApi();
    } else {
        //支付宝小程序
        return genAliPayMinAppWebOpenApi()
    }

};


const getAndroidWebOpnApi = (): Promise<WebViewApi> => {
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
        callPrint: function (printOptions: PrintOptions) {
            return new Promise((resolve, reject) => {
                android.print(JSON.stringify(printOptions));
                // @ts-ignore
                window.printResult = function (result) {
                    const resp = JSON.parse(result);
                    if (resp.result === "0") {
                        resolve(resp);
                    } else {
                        reject(resp);
                    }
                }
            });
        }

    };

    return Promise.reject(webViewApi)
};


/**
 * 获取支付宝webview 开放能力
 */
const genAliPayMinAppWebOpenApi = (): Promise<WebViewApi> => {


    return new Promise(async (resolve, reject) => {

        // @ts-ignore
        if (window.my == null) {
            //加载支付宝能力js
            await new Promise((resolve) => {
                const temp = document.createElement('script');
                temp.setAttribute('type', 'text/javascript');
                temp.src = "https://appx/web-view.min.js";
                temp.onload = function () {
                    // 放在页面不好看，执行完后移除掉
                    console.log("js加载完成");
                    this["parentNode"].removeChild(this);
                    resolve();
                };
                document.body.appendChild(temp);
            })
        }


        const sendMessageToMinApp = (type: string, data: any) => {
            // @ts-ignore
            my.postMessage({
                type,
                data
            })
        };


        const WAIT_QUEUE: Array<{
            type: string;
            resolve: Function,
            reject: Function,
        }> = [];

        // @ts-ignore
        my.onMessage = function (event) {
            const {type, success, result, error} = event.detail;
            const waitItem = WAIT_QUEUE.find(item => item.type === type);
            if (waitItem == null) {
                return;
            }
            if (success) {
                waitItem.resolve(result);
            } else {
                waitItem.reject(error);
            }
        };


        // const fnNames = [
        //     "callPrint",
        //     "callPay"
        // ];
        //
        // const openApi = new Proxy({} as any, {
        //
        //     get(target, prop: keyof WebViewApi, receiver: any): any {
        //         const b = fnNames.some((name) => name === prop);
        //         console.log(`name = ${prop} function no defined`)
        //         if (b) {
        //             return (data) => {
        //                 return new Promise<any>((resolve, reject) => {
        //                     sendMessageToMinApp(prop, data);
        //                     WAIT_QUEUE.push({
        //                         type: prop,
        //                         resolve,
        //                         reject
        //                     });
        //                 });
        //             }
        //             // throw new Error(`name = ${prop} function no defined`);
        //         }
        //
        //         return target[prop];
        //
        //     }
        // });

        const setWitQueue = (type, data, resolve, reject) => {
            sendMessageToMinApp(type, data);
            WAIT_QUEUE.push({
                type,
                resolve,
                reject
            });
        };
        resolve({
            callPay: function (payOptions: PayOptions) {
                return new Promise<any>((resolve, reject) => {
                    setWitQueue("callPay", payOptions, resolve, reject)
                });
            },
            callPrint: function (printOptions: PrintOptions) {
                return new Promise<any>((resolve, reject) => {
                    setWitQueue("callPrint", printOptions, resolve, reject)
                });
            }
        });
    })

};


