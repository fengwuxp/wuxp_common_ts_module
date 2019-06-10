import SpringApplicationContext from "../context/SpringApplicationContext";


/**
 * only use class prop
 *
 *  @target Filed
 * @param expression
 * example:
 *    expression="${a.b.c}"
 * @constructor
 */
export const Value = (expression: string) => {

    return (target, propKey, descriptor: PropertyDescriptor) => {

        const value = SpringApplicationContext.getEnvironment().getProperty(expression);
        descriptor = {
            value
        };

        return descriptor;
    }
};