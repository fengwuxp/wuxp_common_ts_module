/**
 * 代理的生效的范围
 */
export const enum ProxyScope {

    //所有
    ALL,

    /**
     * 仅处理方法的代理
     */
    METHOD,

    /**
     * 处理属性的 get和set
     */
    PROPERTY,

    /**
     * 仅处理属性的get
     */
    // ONLY_GET,

    /**
     * 仅处理属性set
     */
    ONLY_SET,

}

/**
 * 匹配代理范围
 * @param val
 * @param scope
 */
export const matchProxyScope = (val, scope: ProxyScope = ProxyScope.METHOD) => {
    if (scope === ProxyScope.ALL) {
        return true;
    } else {
        const valType = typeof val;
        const isMethod = valType === "function";
        if (isMethod && scope === ProxyScope.METHOD) {
            return true;
        }
        if (!isMethod && scope !== ProxyScope.METHOD) {
            return true;
        }
    }

    return false;
};