import {generateSandboxObject, runScriptWithSandbox} from "./SafetySandboxWrapper";

/**
 * 沙箱环境测试
 */
export const runSandboxEvnTest = function () {

    // 获取一个安全的window沙箱对象
    const safetyWindowObjectSandbox = generateSandboxObject(window);

    //加载远程的js
    fetch("http://192.168.80.1:9999/js/test.js").then((response) => {
        return response.text()
    }).then((data) => {

        //使用沙箱对象运行，保证全局对象不被污染
        (new Function("window", "globalThis", `${data}`)(safetyWindowObjectSandbox, safetyWindowObjectSandbox));

        // 真正的全局对象并没有被改变  window["___A___"] = undefined
        console.log("real window ___A___", window["___A___"]);
        // 沙箱对象  safetyWindowObjectSandbox["___A___"] = 1
        console.log("sandbox window ___A___", safetyWindowObjectSandbox["___A___"]);

        // runScriptWithSandbox(data);
    })
};

