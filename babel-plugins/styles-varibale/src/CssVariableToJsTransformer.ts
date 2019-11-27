export type CssVariableValueTransformer<T = any, O = any> = (value: string, options?: O) => T;

export interface CssVariableToJsTransformOptions {

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
    variableTransformers?: CssVariableValueTransformer[]

    // /**
    //  * 移除尺寸单位，并转换为数字
    //  * 例如 px pt rem等
    //  */
    // removeSizeUnit: boolean;
}

/**
 * css variable to js variable transformer
 */
export interface CssVariableToJsTransformer {

    transform: <T = Record<string, string>>(src: string, filename: string, options: CssVariableToJsTransformOptions) => Promise<T>;
}

export type VariableNameConverter = (variableName: string) => string;
