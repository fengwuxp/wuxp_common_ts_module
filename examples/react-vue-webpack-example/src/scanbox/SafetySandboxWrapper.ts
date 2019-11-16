/**
 * 获取一个沙箱对象
 * @param proxyObject
 */



export const generateSandboxObject = <T>(proxyObject: T): T => {
    const sandbox = {};
    return new Proxy(sandbox as any, {
        get(target, p, receiver) {
            console.log("get", target, p, proxyObject);
            let proxyObjectElement = proxyObject[p];
            if (proxyObjectElement === undefined) {
                proxyObjectElement = target[p];
            }
            if (typeof proxyObjectElement === "function") {
                return function (...args) {
                    return proxyObjectElement(...args);
                }
            }


            if (p === "addEventListener") {
                return function (type, fun, f) {
                    return window.addEventListener(type, fun, fun)
                }
            }

            return proxyObjectElement;
        },
        set(target, p, value, receiver) {
            console.log("set", target, p, value);
            target[p] = value;
            return true;
        }
    });
};

export const runScriptWithSandbox = (script: string) => {
    // 获取一个安全的window沙箱对象
    const safetyWindowObjectSandbox = generateSandboxObject(window);
    //使用沙箱对象运行，保证全局对象不被污染
    const x = [];
    return {
        run: () => {
            (new Function("window", "globalThis", `${script}`)(safetyWindowObjectSandbox, safetyWindowObjectSandbox));
        },
        uninstall: () => {
            // 卸载监听的事件

        }
    }
};



