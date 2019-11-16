import {WebViewApi} from "./WebViewApi";
import {genAliPayMinAppWebOpenApi} from "./AliPayIotMinAppModuleJs";
import {getAndroidWebOpnApi} from "./AndroidNativeModuleJs";
// import "./MockALiPyIotModule";

const loadDebug = async () => {

    if (window["eruda"]) {
        return;
    }
    const temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    temp.src = "http://cdn.bootcss.com/eruda/1.5.2/eruda.min.js";
    temp.onload = function () {
        // 放在页面不好看，执行完后移除掉
        console.log("js加载完成");
        this["parentNode"].removeChild(this);
        window["eruda"] && window["eruda"].init()
    };
    document.body.appendChild(temp);
};

/**
 * 获取web-view 开放api实例
 * @return Promise<WebViewApi>
 */
export const getWebOpenApiInstance = async (enableDebug = true): Promise<WebViewApi> => {

    if (enableDebug) {
        await loadDebug();
    }

    // @ts-ignore
    if (window.android != null) {
        //安卓
        return getAndroidWebOpnApi();
    } else {
        //支付宝小程序
        return genAliPayMinAppWebOpenApi()
    }

};

// window["getWebOpenApiInstance"] = getWebOpenApiInstance;



