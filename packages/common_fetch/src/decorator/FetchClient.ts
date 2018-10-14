import BuilderProxyServiceUtil from "../utils/BuilderProxyServiceUtil";


/**
 * 标记为FetchClient
 * @constructor
 */
export function FetchClient<T extends { new(...args: any[]): any }>() {

    /**
     * @param  {T} clazz
     */
    return (clazz: T): T => {
        return BuilderProxyServiceUtil.build(new clazz());
    }
}
