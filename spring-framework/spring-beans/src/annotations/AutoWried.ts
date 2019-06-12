import {BeanType} from "../BeanType";
import {getBean} from "../context/BeanContext";

export interface AutoWriedOptions {

    name?: string;

    beanType?: string;
}

export function AutoWried(options: AutoWriedOptions = {}): Function {

    const {name, beanType} = options;

    return (target, propKey, descriptor: PropertyDescriptor) => {


        //temporarily only supported by name
        const bean = getBean(name || propKey);


        descriptor = {
            value: bean
        };


        return descriptor;
    }
}
