import {FindMockerStrategy} from "./FunctionMockRegistrar";
import {FunctionMocker} from "./FunctionMocker";


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
            const mockerKeys = Object.keys(mocker);
            const keys = Object.keys(target);


            const len = mockerKeys.map((name) => {
                return keys.find((key) => {
                    return name === key;
                })
            }).map((item) => {
                return item != null;
            }).filter((item) => item).length;

            //当且仅当 mocker中所有的key都被 target包含时才认为相等
            if (len === mockerKeys.length) {
                result = mocker;
            }
        }
    });

    if (result == null) {
        console.error(`not found mocker,target`, target);
    }


    return result;
};