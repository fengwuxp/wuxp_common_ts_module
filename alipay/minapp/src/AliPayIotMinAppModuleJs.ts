/**
 * 获取支付宝webview 开放能力
 */
import {PayOptions, WebViewApi} from "./WebViewApi";
import {TicketType} from "./Printer";

const WAIT_QUEUE: Array<{
    type: string;
    queueIndex: number,
    resolve: Function,
    reject: Function,
}> = [];

const TYPE_INDEX_MAP = {};


export const genAliPayMinAppWebOpenApi = (): Promise<WebViewApi> => {


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
            });
        }


        const sendMessageToMinApp = (type: string, queueIndex: number, data: any) => {
            console.log("发送消息给小程序", type, queueIndex, data)
            // @ts-ignore
            my.postMessage({
                type,
                queueIndex,
                data
            })
        };


        // @ts-ignore
        my.onMessage = function (event) {
            console.log("收到小程序消息", event);
            const {type, success, result, error, queueIndex} = event;
            // console.log("收到小程序消息", type, result);
            const itemIndex = WAIT_QUEUE.findIndex(item => item.type === type && item.queueIndex == queueIndex);
            console.log("itemIndex", itemIndex, WAIT_QUEUE);
            if (itemIndex < 0) {
                return;
            }
            const waitItem = WAIT_QUEUE[itemIndex];
            if (success) {
                waitItem.resolve && waitItem.resolve(result);
            } else {
                waitItem.reject && waitItem.reject(error);
            }
            WAIT_QUEUE.splice(itemIndex, 1);
            console.log("WAIT_QUEUE", WAIT_QUEUE.length);
        };


        const setWitQueue = (type, data, resolve, reject) => {
            const queueIndex: number = TYPE_INDEX_MAP[type] || 0;
            TYPE_INDEX_MAP[type] = queueIndex;
            TYPE_INDEX_MAP[type]++;
            sendMessageToMinApp(type, queueIndex, data);
            WAIT_QUEUE.push({
                type,
                queueIndex,
                resolve,
                reject
            });
            console.log("WAIT_QUEUE", WAIT_QUEUE.length);
        };


        // return new Proxy({}, {
        //     get(target: {}, prop: string | number | symbol, receiver: any): any {
        //
        //         return function (...args) {
        //             return new Promise<any>((resolve, reject) => {
        //                 setWitQueue(prop, [...args], resolve, reject)
        //             });
        //         }
        //     }
        //
        // })
        resolve({
            callPay: function (payOptions: PayOptions) {
                return new Promise<any>((resolve, reject) => {
                    setWitQueue("callPay", payOptions, resolve, reject)
                });
            },
            callGetLocalPrinterList: function () {
                return new Promise<any>((resolve, reject) => {
                    setWitQueue("callGetLocalPrinterList", undefined, resolve, reject)
                });
            },
            callPrintTicket: function (type: TicketType, data: any) {
                return new Promise<any>((resolve, reject) => {
                    setWitQueue("callPrintTicket", [type, data], resolve, reject)
                });
            },
            callSetPrinter: function (type: TicketType, data: any) {
                setWitQueue("callSetPrinter", [type, data], resolve, reject)
            },
            callLoginOutAfterClassExchange: function () {
                setWitQueue("callLoginOutAfterClassExchange", undefined, null, null)
            }


        });
    })

};


