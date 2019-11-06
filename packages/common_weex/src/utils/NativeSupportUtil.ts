/**
 * 判断原生能力支持
 * @param modelName 模块名称 必填
 * @param fnName    方法名称
 */
export const supportNativeAbility = (modelName, fnName = '') => {
    if (weex.supports == null) {
        console.warn("当前weex版本不支持 weex.supports 方法，请检查sdk是否大于0.15");
        return false;
    }
    let s = `@module/${modelName}`;
    if (fnName.trim().length > 0) {
        s += "." + fnName
    }
    return weex.supports(s);
};


/**
 * 是否支持友盟
 */
export const supportUMeng = () => {
    return supportNativeAbility("umeng");
};
