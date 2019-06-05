// import ah from "ajax-hook"
// import {ajaxHookFactory} from "./ajax-hook/index";
// import $ from "jquery";


import {finDeepIframeWindow} from "./helper/FindIframeWindowObject";

console.log("注入脚本injected script");

// $(function () {
//
//     $(document).ajaxSend((event, jqXHR, ajaxOptions) => {
//         console.log(event, jqXHR, ajaxOptions);
//     })
// });


const handle = async function () {
    // const iframeCms = document.getElementById("iframe_cms")

    console.log(window.frames)

    // const _window = await finDeepIframeWindow(["iframe_cms","_oid_ifr_"], window);
    // const _window = await finDeepIframeWindow(["_oid_ifr_"], window);
    //
    // console.log("_window", _window);
    //
    // const oldFetch = _window.fetch;
    // _window.fetch = function (input: any, init: any) {
    //     console.log("fetch 拦截", input, init);
    //     return oldFetch(input, init);
    // };

    // ajaxHookFactory(_window).hookAjax({
    //     onreadystatechange: function (xhr) {
    //         console.log("onreadystatechange called: %O", xhr)
    //         //return true
    //
    //     },
    //     onload: function (xhr) {
    //         console.log("onload called: %O", xhr);
    //         xhr.responseText = "hook" + xhr.responseText;
    //         //return true;
    //     },
    //     open: function (arg, xhr) {
    //         console.log("open called: method:%s,url:%s,async:%s", arg[0], arg[1], arg[2], xhr)
    //         //add tag
    //         arg[1] += "?hook_tag=1";
    //
    //     },
    //     send: function (arg, xhr) {
    //         console.log("send called: %O", arg[0])
    //         xhr.setRequestHeader("_custom_header_", "ajaxhook")
    //     },
    //     setRequestHeader: function (arg, xhr) {
    //         console.log("setRequestHeader called!", arg)
    //     }
    // });
};
setTimeout(handle, 10 * 1000);

