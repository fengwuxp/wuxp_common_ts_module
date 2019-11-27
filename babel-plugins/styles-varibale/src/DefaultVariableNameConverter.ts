import {VariableNameConverter} from "./CssVariableToJsTransformer";

export const noneResolver: VariableNameConverter = (methodName) => methodName;

/**
 * 下划线转驼峰
 * @param methodName
 */
export const toHumpResolver: VariableNameConverter = (methodName: string) => methodName.replace(/\\_(\w)/g, (all, letter) => {
    return letter.toUpperCase();
});

/**
 * 驼峰转下划线
 * @param methodName
 */
export const toLineResolver: VariableNameConverter = (methodName: string) => {
    return methodName.replace(/([A-Z])/g, "_$1").toLowerCase();
};

/**
 * 中划线转驼峰
 * @param methodName
 */
export const toHumpResolverByDash: VariableNameConverter = (methodName: string) => {
    const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    const MOZ_HACK_REGEXP = /^moz([A-Z])/;
    return methodName.replace(SPECIAL_CHARS_REGEXP, (_, separator, letter, offset) => {
        return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

/**
 * 驼峰转中划线
 * @param methodName
 */
export const humpToDashResolver: VariableNameConverter = (methodName: string) =>
    methodName.replace(/([^-])([A-Z])/g, '$1-$2')
        .replace(/([^-])([A-Z])/g, '$1-$2')
        .toLowerCase();


/**
 * 转大写
 * @param methodName
 */
export const toUpperCaseResolver: VariableNameConverter = (methodName: string) => {

    return methodName.toUpperCase();
};

/**
 * 转小写
 * @param methodName
 */
export const toLocaleUpperCaseResolver: VariableNameConverter = (methodName: string) => {

    return methodName.toLocaleUpperCase();
};

/**
 * 从右向左合并处理
 * @param resolvers
 */
export const reduceRightCommandResolvers = (...resolvers: VariableNameConverter[]): VariableNameConverter => {

    return (methodName: string) => {
        return resolvers.reduceRight((prev, resolver) => {
            return resolver(prev);
        }, methodName);
    }
};
