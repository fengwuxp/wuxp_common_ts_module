import DefaultFunctionMockRegistrar from "./DefaultFunctionMockRegistrar"


/**
 * 包装一个对象为mocker
 * @param target 被包装的目标
 */
export const wrapperObjectToMocker = <T>(target: T): T => {

    if (process.env.ENABLED_MOCKER_MODE) {
        //开启mocker模式
        return DefaultFunctionMockRegistrar.getMocker<T>(target);
    }

    return target;

};