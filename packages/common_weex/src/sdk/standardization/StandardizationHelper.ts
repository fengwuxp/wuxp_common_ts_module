import {WeexModule} from "weex";
import {WeexStandardizedModule} from "./WeexStandardizedModule";

type TransformParamHandle = (...otherArgs) => any[]

type TransformCallbackTypeHandle = (resolve, reject) => Function[];

type EnhanceHandle<T = any> = (weexStandardizedModule: WeexStandardizedModule, ...args) => Promise<T>;

interface WeexStandardizedOptions<M = WeexStandardizedModule> {

    /**
     * 需要标准化的模块
     */
    module: WeexModule,


    /**
     * 参数装换的映射表
     */
    transformParamMap?: TransformParamHandle | {
        /**
         * 参数转换
         * key 方法名称
         */
        [key in keyof M]?: TransformParamHandle;
    };


    /**
     * 回调转换
     * @param resolve
     * @param reject
     */
    transformCallbackMap?: TransformCallbackTypeHandle | {
        [key in keyof M]?: TransformCallbackTypeHandle;
    }

    /**
     * 模块增强的映射表
     * 当基础模块提供的能力参数较为复杂时，可以使用该配置进行方法增强，简化开发的调用
     */
    enhanceMap?: EnhanceHandle | {
        /**
         * 参数转换
         * key 方法名称
         */
        [key in keyof M]?: EnhanceHandle
    }
}

const defaultOptions: WeexStandardizedOptions = {
    transformParamMap: {},
    transformCallbackMap: (resolve, reject) => {
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
export const standardizedWeexModuleToPromise = <T extends WeexStandardizedModule>(options: WeexStandardizedOptions<T>): T => {

    const {
        module,
        transformParamMap,
        transformCallbackMap,
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

    console.log("funNames", funNames);


    funNames.forEach((key) => {
        // value:属性的值
        // writable:如果为false，属性的值就不能被重写,只能为只读了
        // configurable:总开关，一旦为false，就不能再设置他的（value，writable，configurable）
        // enumerable:是否能在for...in循环中遍历出来或在Object.keys中列举出来。
        Object.defineProperty(proxy, key, {
            set: (val) => {
                throw new Error("standardized proxy module 不允许添加新的方法");
            },
            get: () => {
                return (...p) => {
                    const func = module[key];
                    if (func != null) {
                        return new Promise((resolve, reject) => {
                            const transformParamHandle: TransformParamHandle = getHandleByConfigMap(transformParamMap, key);
                            const transformCallbackTypeHandle: TransformCallbackTypeHandle = getHandleByConfigMap(transformCallbackMap, key);
                            func(...(transformParamHandle ? transformParamHandle(...p) : p), ...transformCallbackTypeHandle(resolve, reject));
                        });
                    }
                    const enhanceHandle = getHandleByConfigMap(enhanceMap, key);
                    if (enhanceHandle != null) {
                        return enhanceHandle(proxy, ...p);
                    } else {
                        throw new Error(`not support method: ${key}`);
                    }

                }
            }
        });
    });


    return proxy as T;
};

const getHandleByConfigMap = (handleMap, name: string) => {

    return typeof handleMap === "function" ? handleMap : handleMap[name];
};