import {FunctionMocker} from "./FunctionMocker";


/**
 * 功能模拟注册器
 */
export interface FunctionMockRegistrar {


    /**
     * 添加一mocker
     * @param mocker
     */
    registerMocker: (mocker: FunctionMocker) => void;


    /**
     * 获取一个mocker
     * @param target
     * @param findMockerStrategy
     */
    getMocker<T>(target:T, findMockerStrategy?: FindMockerStrategy<T>): T;
}

/**
 * 查找 mocker的策略
 */
export type FindMockerStrategy<T = any> = (target: T, mocker: Set<FunctionMocker>) => T;

