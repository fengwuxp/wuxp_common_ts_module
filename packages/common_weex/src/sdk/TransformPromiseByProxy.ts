import {WeexModule} from "weex";
import {WeexPromiseModule} from "./module/WeexPromiseModule";

/**
 * 通过代理进行装换
 * @param weexModule
 */
export const transformPromiseByProxy = <T extends WeexPromiseModule>(weexModule: WeexModule): T => {

    const proxy = {};

//         value:属性的值
//         writable:如果为false，属性的值就不能被重写,只能为只读了
//         configurable:总开关，一旦为false，就不能再设置他的（value，writable，configurable）
//         enumerable:是否能在for...in循环中遍历出来或在Object.keys中列举出来。

    for (const key in weexModule) {

        Object.defineProperty(proxy, key, {
            set: function (val) {
                throw new Error("proxy module 不允许添加新的方法");
            },
            get: () => {
                return (...p) => {
                    return new Promise((resolve, reject) => {
                        weexModule[key](...p, ({result, data}) => {
                            if (result === "success") {
                                resolve(data);
                            } else {
                                result();
                            }
                        });
                    });
                }
            }
        });
    }

    return proxy as T;
};