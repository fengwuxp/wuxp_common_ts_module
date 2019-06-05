/**
 * 从谷歌扩展中注入js
 * @param jsPath
 */
export const injectScriptToChromeExtension = (jsPath: string = 'js/injected_script.js') => {



    const temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    const url = chrome.extension.getURL(jsPath);
    console.log("---注入js-->", url);

    temp.src = url;
    temp.onload = function () {
        // 放在页面不好看，执行完后移除掉
        this["parentNode"].removeChild(this);
    };

    document.body.appendChild(temp);
};


