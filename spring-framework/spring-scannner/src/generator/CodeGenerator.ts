

/**
 * code generator
 */
export interface CodeGenerator<T = any> {

    generator: (...args) => T;
}