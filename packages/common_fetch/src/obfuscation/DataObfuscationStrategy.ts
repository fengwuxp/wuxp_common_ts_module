/**
 *  data obfuscation strategy
 */
export interface DataObfuscationStrategy<T = any> {


    /**
     * encode
     * @param data
     */
    encode: (data: T) => T;

    /**
     * decode
     * @param data
     */
    decode: (data: T) => T;
}