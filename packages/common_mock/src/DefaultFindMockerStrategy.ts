import {FindMockerStrategy} from "./FunctionMockRegistrar";
import {FunctionMocker} from "./FunctionMocker";
import ProxyFactory from "common_proxy/src/ProxyFactory";


const CACHE: Map<any, any> = new Map();


/**
 * 默认的查找策略
 * @param target
 * @param mockers
 */
export const defaultFindMockerStrategy: FindMockerStrategy = (target: any, mockers: Set<FunctionMocker>) => {


    let result = CACHE.get(target);
    if (result != null) {
        return null;
    }
    const isFunction = typeof target === "function";

    let needMerge = false;
    mockers.forEach((mocker) => {
        if (result != null) {
            return;
        }


        if (isFunction) {
            const functionObject = (target as Function);
            const functionObjectMocker = (mocker as Function);
            if (functionObject.name === functionObjectMocker.name && functionObject.prototype === functionObjectMocker.prototype) {
                result = mocker;
            }
        } else {
            const mockerKeys = Object.getOwnPropertyNames(mocker);
            const keys = Object.getOwnPropertyNames(target);
            const containLength = mockerKeys.map((name) => {
                return keys.find((key) => {
                    return name === key;
                })
            }).map((item) => {
                return item != null;
            }).filter((item) => item).length;

            //当且仅当 mocker中2/3的key都被 target包含时才认为相等
            const length = mockerKeys.length;
            if (containLength >= length / 3 * 2) {
                result = mocker;
            }
            needMerge = containLength >= length;

        }
    });

    if (result == null) {
        // console.error(`not found mocker,target`, target);
        return target
    }

    if (needMerge) {
        //使用代理合并
        return ProxyFactory.newProxyInstanceEnhance(result,
            (object: any, propertyKey: PropertyKey, receiver: any) => {
                return object[propertyKey];
            }, (object: any, propertyKey: PropertyKey, receiver: any) => {

                return target[propertyKey];
            });
    }


    return result;
};