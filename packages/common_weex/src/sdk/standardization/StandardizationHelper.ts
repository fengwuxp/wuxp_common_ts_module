import {WeexModule} from "weex";
import {WeexStandardizedModule} from "./WeexStandardizedModule";

interface WeexStandardizedOptions {

    /**
     * 需要标准化的模块
     */
    module: WeexModule,


    /**
     * 参数装换的映射表
     */
    transformParamMap?: {
        /**
         * 参数转换
         * key 方法名称
         */
        [key: string]: (...otherArgs) => any
    };

    /**
     * 回调转换
     * @param resolve
     * @param reject
     */
    transformCallback?: (resolve, reject) => Function[];

    /**
     * 模块增强的映射表
     * 当基础模块提供的能力参数较为复杂时，可以使用该配置进行方法增强，简化开发的调用
     */
    enhanceMap?: {
        /**
         * 参数转换
         * key 方法名称
         */
        [key: string]: (weexStandardizedModule: WeexStandardizedModule, ...args) => Promise<any>
    }
}

const defaultOptions: WeexStandardizedOptions = {
    transformParamMap: {},
    transformCallback: (resolve, reject) => {
        return [
            ({result, data}) => {
                if (result === "success") {
                    resolve(data);
                } else {
                    reject();
                }
            }
        ];
    },
    enhanceMap: {},
    module: undefined


};

/**
 * 将weex的模块标准化为promise
 * @param options
 */
export const standardizedWeexModuleToPromise = <T extends WeexStandardizedModule>(options: WeexStandardizedOptions): T => {

    const {
        module,
        transformParamMap,
        transformCallback,
        enhanceMap
    } = {
        ...defaultOptions,
        ...options,
    };

    const proxy = {};

    const funNames = [
        ...Object.keys(module).filter((key) => {
            return typeof module[key] == "function";
        }),
        ...Object.keys(enhanceMap)
    ];


    funNames.forEach((key) => {

        //  value:属性的值
        //  writable:如果为false，属性的值就不能被重写,只能为只读了
        //  configurable:总开关，一旦为false，就不能再设置他的（value，writable，configurable ）
        //  enumerable:是否能在for...in循环中遍历出来或在Object.keys中列举出来。
        Object.defineProperty(proxy, key, {
            set: (val) => {
                throw new Error("proxy module 不允许添加新的方法");
            },
            get: () => {
                return (...p) => new Promise((resolve, reject) => {
                    const transformParamFn = transformParamMap[key];
                    const func = module[key];
                    if (func == null) {
                        const enhanceFunc = enhanceMap[key];
                        if (enhanceFunc != null) {
                            return enhanceFunc(proxy, ...p);
                        }
                    } else {
                        func(...(transformParamFn ? transformParamFn(...p) : p), ...transformCallback(resolve, reject));
                    }

                });
            }
        });
    });


    return proxy as T;
};