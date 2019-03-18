import {FunctionMocker} from "./FunctionMocker";


/**
 * 功能模拟注册器
 */
export interface FunctionMockRegistrar {

    /**
     * 注册
     * @param target    被mock的目标
     * @param mocker    mocker
     */
    register: (target: any, mocker: FunctionMocker) => void;


    /**
     * 获取一个mocker
     * @param target
     */
    getMocker<T>(target: any): T;
}

