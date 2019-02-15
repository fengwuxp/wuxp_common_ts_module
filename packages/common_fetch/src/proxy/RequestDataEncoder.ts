/**
 *  request data encoder
 */
export interface RequestDataEncoder<T = any> {


    /**
     * encode
     * @param request
     */
    encode: (request: T) => Promise<T>
}