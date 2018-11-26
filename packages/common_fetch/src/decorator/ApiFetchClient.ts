import BuilderProxyServiceUtil from "../utils/BuilderProxyServiceUtil";


/**
 * 标记为ApiFetchClient
 * @constructor
 */
export function ApiFetchClient<T extends { new(...args: any[]): any }>():any  {

    /**
     * @param  {T} clazz
     */
    return (clazz: T): T => {
        return BuilderProxyServiceUtil.build(new clazz());
    }
}
