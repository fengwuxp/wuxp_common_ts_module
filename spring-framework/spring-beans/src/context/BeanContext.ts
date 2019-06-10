import {BeanType} from "../BeanType";
import {BeanDefinition} from "../BeanDefinition";


const BEANS_CONTEXT: Map<BeanType, BeanDefinition> = new Map();

const BEAN_NAMED_TYPES: Map<string/*bean name*/, BeanType> = new Map<string, BeanType>();
const BEAN_CLASSNAME_TYPES: Map<string/*class name*/, BeanType> = new Map<string, BeanType>();


/**
 *  register bean
 * @param beanType
 * @param beanDefinition
 */
export const registerBeanDefinition = (beanType: BeanType, beanDefinition: BeanDefinition) => {

    BEANS_CONTEXT.set(beanType, beanDefinition);
    BEAN_NAMED_TYPES.set(beanType.name, beanType);
    BEAN_CLASSNAME_TYPES.set(beanType.getClassName(), beanType);
};

/**
 *
 * @param options
 */
export const unRegisterBeanDefinition = ({beanType, beanName}: {
    beanName?: string,
    beanType?: string
}) => {
    let _beanType;
    if (beanName) {
        _beanType = BEAN_NAMED_TYPES.get(beanName);
    }
    if (beanType) {
        _beanType = BEAN_CLASSNAME_TYPES.get(beanName);
    }

    BEANS_CONTEXT.delete(_beanType);
    BEAN_NAMED_TYPES.delete(_beanType.name);
    BEAN_CLASSNAME_TYPES.delete(_beanType.getClassName());

};

export const getBean = <T = any>(beanType: string | BeanType): T => {

    if (typeof beanType === "string") {
        beanType = BEAN_NAMED_TYPES.get(beanType);
    } else {
        beanType = BEAN_CLASSNAME_TYPES.get(beanType.getClassName());
    }

    const beanDefinition = BEANS_CONTEXT.get(beanType);
    if (beanDefinition == null) {
        console.error("not found bean", beanType);
        return null;
    }
    return beanDefinition.getBean();
};