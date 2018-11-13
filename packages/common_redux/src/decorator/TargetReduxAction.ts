import {ReduxActionHandler} from "../action/ReduxActionHandler";


/**
 * 期望执行的目标action 默认为 setProps
 * @param {Function} action
 * @return {(target, name, descriptor) => any}
 * @constructor
 */
export function TargetAction(action?: Function): Function {

    /**
     * decorator
     * @param  {ReduxActionHandler} target       装饰的属性所述的类的原型
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function <S>(target: ReduxActionHandler<S>, name: string, descriptor: PropertyDescriptor): any {

        console.log("---------target-------", target, name, action);

        //返回一个异步的action方法
        const handle = target[name];
        target[name] = async function (...args) {
            const newState = await handle(...args);
            if (action == null) {
                target.setProps(newState);
            } else {
                target[action.name](newState);
            }
        };

        return target;
    }
}

