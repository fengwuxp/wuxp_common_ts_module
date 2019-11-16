import BroadcastPlugin from "oak_common/src/plugins/broadcast/BroadcastPlugin";
import {getMessageHandler} from "./MinAppMessageHandle";


const broadcastPlugin = new BroadcastPlugin();

console.log("mock");

// @ts-ignore
window.iotMinapp = {
    onMessage: () => {
        broadcastPlugin.register("_B_", "_B_", (event) => {
            getMessageHandler({
                postMessage: (event) => {
                    console.log("--回复消息-->", event)
                    broadcastPlugin.send("_A_", "_A_", event)
                }
            }).onGetLocalPrinterList((event) => {
                console.log("onGetLocalPrinterList", event)
                return Promise.resolve(event);
            }).onLoginOutAfterClassExchange((event) => {
                return Promise.resolve(event);
            }).onPrint((event) => {
                return Promise.resolve(event);
            }).dispatch()(event.data);
        }, () => {

        })

    }
};
// @ts-ignore
window.iotMinapp.onMessage();

// @ts-ignore
window.my = {
    // @ts-ignore
    postMessage: function (data) {
        broadcastPlugin.send("_B_", "_B_", {
            detail: data
        }, null)
    },
    _onMessage: function () {
        broadcastPlugin.register("_A_", "_A_", (event) => {
            console.log("收到消息", event);
            // @ts-ignore
            window.my.onMessage(event.data);
        }, () => {

        })
    }
};
// @ts-ignore
window.my._onMessage();


window["android"] = {
    getLocalTicketPrinterList: function (fnName) {
        console.log("-fnName->", fnName);
        // @ts-ignore
        (window[fnName] || window.parent[fnName])([""]);
    },
    loginOutAfterClassExchange(){
        console.log("loginOutAfterClassExchange ")
    }
};
