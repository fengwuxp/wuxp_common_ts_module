interface BeanOptions {

    name?: string;

    initMethod?: string;

    destroyMethod?: string;
}


/**
 *  Indicates that a method produces a bean to be managed by the Spring container.
 * @constructor
 */
export const Bean = (options?: BeanOptions) => {


    const beanOptions: BeanOptions = {
        ...(options || {})
    };

    return (target, name, descriptor: PropertyDescriptor) => {


        const beanFactory:Function = target[name];

        // const arguments = beanFactory.arguments;

    }
};