console.log("background script");

// https://blog.csdn.net/weixin_33836874/article/details/86262165
chrome.webRequest.onBeforeRequest.addListener(
    async (details) => {

        const requestBody = details.requestBody;
        console.log("onBeforeRequest", details, requestBody);
        if (requestBody != null) {
            const {raw, formData} = requestBody;
            if (raw) {
                const values: string[] = await Promise.all(raw.map((item) => arrayBufferToString(item.bytes)));
                values[0] = JSON.stringify({name: "往往"});
                const bytes: ArrayBuffer[] = await Promise.all(values.map((text) => stringToArrayBuffer(text)));
                raw.forEach((item, index) => {
                    item.bytes = bytes[index];
                });
            }
            if (formData) {
                console.log("请求的表单数据：", formData);
                requestBody.formData.name = ["王五"];
            }

        }
        // details.requestBody = {...requestBody};
        // return {cancel: true};
        // const result = {requestBody};
        // console.log("result", result)
        // return result;

    },
    {
        urls: ["<all_urls>"],
        types: ["xmlhttprequest", "sub_frame"]
    },
    ["requestBody"]
);

function arrayBufferToString(arrayBuffer: ArrayBuffer): Promise<string> {
    if (arrayBuffer == null) {
        return Promise.reject();
    }
    const b = new Blob([arrayBuffer]);
    const r = new FileReader();
    r.readAsText(b, 'utf-8');
    return new Promise<string>((resolve, reject) => {
        r.onload = function (e) {
            console.log(e);
            resolve(r.result as string);
        }
    })
}

function stringToArrayBuffer(text: string): Promise<ArrayBuffer> {
    var b = new Blob([text], {type: 'text/plain'});
    var r = new FileReader();
    r.readAsArrayBuffer(b);
    return new Promise<ArrayBuffer>((resolve, reject) => {
        r.onload = function (e) {
            console.log(e);
            resolve(r.result as ArrayBuffer);
        }
    })
}


// chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
//         console.log("onBeforeSendHeaders", details.requestHeaders);
//
//     },
//     {
//         urls: ["<all_urls>"],
//         types: ["xmlhttprequest", "main_frame"],
//     },
//     ["requestHeaders"]
// );

// chrome.webRequest.onSendHeaders.addListener((details) => {
//         console.log("onSendHeaders", details,details.requestHeaders);
//     },
//     {
//         urls: ["<all_urls>"],
//         types: ["xmlhttprequest"]
//     }
// );
//
// chrome.webRequest.onHeadersReceived.addListener((details) => {
//         console.log("onHeadersReceived", details);
//     },
//     {
//         urls: ["<all_urls>"],
//         types: ["xmlhttprequest"]
//     }
// );