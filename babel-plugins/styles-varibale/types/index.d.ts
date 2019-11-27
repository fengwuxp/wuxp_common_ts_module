declare type CssVariableValueTransformer<T = any, O = any> = (value: string, options?: O) => T;
interface CssVariableToJsTransformOptions {
    /**
     * 忽略的变量
     */
    ignoreVariables?: string[];
    /**
     * 和@import中的路径相对的根路径
     */
    paths?: string[];
    /**
     * 移除变量名称前缀
     */
    removeVariableNamePrefix?: boolean;
    /**
     * css变量值转换
     */
    variableTransformers?: CssVariableValueTransformer[];
}
/**
 * css variable to js variable transformer
 */
interface CssVariableToJsTransformer {
    transform: <T = Record<string, string>>(src: string, filename: string, options: CssVariableToJsTransformOptions) => Promise<T>;
}
declare type VariableNameConverter = (variableName: string) => string;

interface RemoveCssVariableValueSizeUnitTransformerOptions {
    unitMap: Record<"px" | "rem" | "pt", number>;
    cssVariableValueTransformer?: CssVariableValueTransformer;
}
/**
 * 移除css 变量的尺寸单位
 * 移除的单位如下：px, rem,pt 等，并按照不同单位转换后可以进行换算
 * @param value
 * @param options  example: {px:1,rem:16}
 */
declare const removeCssVariableValueSizeUnitTransformer: CssVariableValueTransformer<number, RemoveCssVariableValueSizeUnitTransformerOptions>;

/**
 * less variable to js variable
 */
declare class LessVariableToJsTransformer implements CssVariableToJsTransformer {
    private variableNameConverter;
    private static VARIABLE_NAME_PREFIX;
    constructor(variableNameConverter?: VariableNameConverter);
    transform: <T = Record<string, string>>(src: string, filename: string, cssVariableToJsTransformOptions: CssVariableToJsTransformOptions) => Promise<T>;
}

declare const generateTypescriptFile: (variables: Record<string, any>, filepath: string) => void;

declare const noneResolver: VariableNameConverter;
/**
 * 下划线转驼峰
 * @param methodName
 */
declare const toHumpResolver: VariableNameConverter;
/**
 * 驼峰转下划线
 * @param methodName
 */
declare const toLineResolver: VariableNameConverter;
/**
 * 中划线转驼峰
 * @param methodName
 */
declare const toHumpResolverByDash: VariableNameConverter;
/**
 * 驼峰转中划线
 * @param methodName
 */
declare const humpToDashResolver: VariableNameConverter;
/**
 * 转大写
 * @param methodName
 */
declare const toUpperCaseResolver: VariableNameConverter;
/**
 * 转小写
 * @param methodName
 */
declare const toLocaleUpperCaseResolver: VariableNameConverter;
/**
 * 从右向左合并处理
 * @param resolvers
 */
declare const reduceRightCommandResolvers: (...resolvers: VariableNameConverter[]) => VariableNameConverter;

export { CssVariableToJsTransformOptions, CssVariableToJsTransformer, CssVariableValueTransformer, LessVariableToJsTransformer, VariableNameConverter, generateTypescriptFile, humpToDashResolver, noneResolver, reduceRightCommandResolvers, removeCssVariableValueSizeUnitTransformer, toHumpResolver, toHumpResolverByDash, toLineResolver, toLocaleUpperCaseResolver, toUpperCaseResolver };
