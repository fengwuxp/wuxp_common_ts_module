import {injectScriptToChromeExtension} from "./helper/InjectScriptHelper";

console.log("content script");


window.onload = function () {

    console.log("注入js");
    injectScriptToChromeExtension()
};
