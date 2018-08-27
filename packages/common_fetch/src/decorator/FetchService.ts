import BuilderProxyServiceUtil from "../utils/BuilderProxyServiceUtil";


/**
 * 标记为fetchService
 * @constructor
 */
export function FetchService<T extends { new(...args: any[]): any }>() {

    /**
     * @param  {T} clazz
     */
    return (clazz: T): T => {
        return BuilderProxyServiceUtil.build(new clazz());
    }
}