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

    dispatch: () => (event) => void
}

const sendMessageToWebView = (data) => {
    // @ts-ignore
    my.postMessage(data)
};

export const messageHandler: MinAppMessageHandler = new Proxy(
    {
        handles: {}
    } as any,
    {
        get(target: MinAppMessageHandler, prop: string, receiver: any): any {

            if (prop === "dispatch") {
                return (): (event) => void => {
                    return function (event) {
                        const {type, data} = event.detail;
                        // @ts-ignore
                        const handle = target.handles[type];
                        if (handle == null) {
                            throw new Error("");
                        }
                        handle(data).then((result) => {
                            sendMessageToWebView({
                                type,
                                success: true,
                                result
                            })
                        }).catch((error) => {
                            sendMessageToWebView({
                                false: true,
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


