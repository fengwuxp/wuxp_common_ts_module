import {CssVariableValueTransformer} from "./CssVariableToJsTransformer";


interface RemoveCssVariableValueSizeUnitTransformerOptions {

    unitMap: Record<"px" | "rem" | "pt", number>;

    cssVariableValueTransformer?: CssVariableValueTransformer
}

const defaultSizeCssVariableValueTransformer = (val: string, num) => {
    return parseInt(val) * num;
};

/**
 * 移除css 变量的尺寸单位
 * 移除的单位如下：px, rem,pt 等，并按照不同单位转换后可以进行换算
 * @param value
 * @param options  example: {px:1,rem:16}
 */
export const removeCssVariableValueSizeUnitTransformer: CssVariableValueTransformer<number, RemoveCssVariableValueSizeUnitTransformerOptions>
    = (value: string, options: RemoveCssVariableValueSizeUnitTransformerOptions) => {

    const {unitMap, cssVariableValueTransformer} = options;

    const val = value.toLocaleLowerCase();
    const unit = ["px", "pt", "rem"].find((unit) => {
        return val.endsWith(unit)
    });
    if (unit == null) {
        return val;
    }

    return (cssVariableValueTransformer || defaultSizeCssVariableValueTransformer)(value.replace(unit, ""), unitMap[unit] || 1)
};
