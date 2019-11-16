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

export interface MinAppMessageHandler {

    onPrint: (handle: (data: any) => Promise<any>) => this;

    onPay: (handle: (data: PayOptions) => Promise<any>) => this;

    onGetLocalPrinterList: (handle: (data: any) => Promise<any>) => this;

    onSetPrinter: (handle: (data: any) => Promise<any>) => this;

    onPrintTicket: (handle: (data: any) => Promise<any>) => this;

    onLoginOutAfterClassExchange: (handle: (data: any) => void) => this;


    dispatch: () => (event) => void
}

export const getMessageHandler = (webViewContext) => {

    const sendMessageToWebView = (data) => {
        // @ts-ignore
        console.log("发送消息给网页", data);
        webViewContext.postMessage(data);
    };


    const messageHandler: MinAppMessageHandler = new Proxy(
        {
            handles: {}
        } as any,
        {
            get(target: MinAppMessageHandler, prop: string, receiver: any): any {

                if (prop === "dispatch") {
                    return function (): (event) => void {
                        console.log("dispatch")
                        return function (event) {
                            console.log("收到消息", event);
                            const {type, data, queueIndex} = event.detail;
                            // @ts-ignore
                            const handle = target.handles[type];
                            if (handle == null) {
                                throw new Error("handle is error");
                            }
                            const argsIsArray = Array.isArray(data);
                            let p;
                            //使用bind 保证this不变
                            if (argsIsArray) {
                                // 参数为数组
                                p = handle.bind(this, ...data)();
                            } else {
                                p = handle.bind(this, data)();
                            }

                            if (p == null || typeof p.then !== "function") {
                                sendMessageToWebView({
                                    type,
                                    queueIndex,
                                    success: true,
                                });
                                return;
                            }

                            p.then((result) => {
                                sendMessageToWebView({
                                    type,
                                    queueIndex,
                                    success: true,
                                    result
                                })
                            }).catch((error) => {
                                sendMessageToWebView({
                                    false: true,
                                    queueIndex,
                                    error,
                                    type
                                })
                            })
                        }
                    }
                }

                const functionNamePrefix = "on";
                if (prop.startsWith(functionNamePrefix)) {
                    return function (handle) {
                        const name = prop.replace(functionNamePrefix, "call");
                        //首字母小写
                        // const strings = prop.split("").splice(2);
                        // strings[0]=strings[0].toLocaleLowerCase();
                        // @ts-ignore
                        target.handles[name] = handle;
                        return messageHandler;
                    }
                }

                throw new Error("function no defined");
            }
        });

    return messageHandler;
};
