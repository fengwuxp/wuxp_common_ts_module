import {ReduxActionHandler} from "../action/ReduxActionHandler";


/**
 * 表明方法是一个reducer
 * @constructor
 */
export function Reducer() {

    /**
     * decorator
     * @param  {ReduxActionHandler} target       装饰的属性所述的类的原型
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function <S>(target: ReduxActionHandler<S>, name: string, descriptor: PropertyDescriptor): any {


        return target;
    }
}

/**
 * 表明方法是一个action
 * @constructor
 */
export function Action() {

    /**
     * decorator
     * @param  {ReduxActionHandler} target       装饰的属性所述的类的原型
     * @param  {string} name                     装饰的属性的 key
     * @param  {PropertyDescriptor} descriptor   装饰的对象的描述对象
     */
    return function <S>(target: ReduxActionHandler<S>, name: string, descriptor: PropertyDescriptor): any {


        return target;
    }
}
