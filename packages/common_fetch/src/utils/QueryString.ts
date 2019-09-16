import {ParsedUrlQueryInput, StringifyOptions} from "querystring";
import StringUtils from "fengwuxp_common_utils/src/string/StringUtils";


const stringifyPrimitive = function (v) {
    switch (typeof v) {
        case 'string':
            return v;

        case 'boolean':
            return v ? 'true' : 'false';

        case 'number':
            return isFinite(v) ? v : '';

        default:
            return '';
    }
};

/**
 * 组装查询字符串
 * @param obj
 * @param filterNoneValue
 * @param sep
 * @param eq
 * @name name
 */
export const stringify = (obj: ParsedUrlQueryInput,
                          filterNoneValue: boolean = true,
                          sep?: string,
                          eq?: string,
                          name?: string): string => {
    sep = sep || '&';
    eq = eq || '=';
    if (obj === null) {
        obj = undefined;
    }

    if (typeof obj === 'object') {
        return Object.keys(obj).map(function (key) {
            const value = obj[key];
            if (filterNoneValue) {
                if (value == null) {
                    return;
                }
                const valType: string = typeof value;
                if (valType === "number" && isNaN(value as number)) {
                    return;
                }
                if (valType === "string") {
                    if (StringUtils.hasText(value as string)) {
                        return;
                    }
                }
            }
            const ks = `${encodeURIComponent(stringifyPrimitive(key))}${eq}`;
            if (Array.isArray(value)) {
                // const list = (value as Array<any>).map(function (v) {
                //     return `${ks}${encodeURIComponent(stringifyPrimitive(v))}`;
                // });
                // if (list.length == 0) {
                //     return;
                // }
                // return `${ks}${list.join(sep)}`;

                if (value.length == 0) {
                    return;
                }
                // key=1,2,3
                return `${ks}${value.join(",")}`;

            } else {
                return `${ks}${encodeURIComponent(stringifyPrimitive(value))}`;
            }
        }).filter(val => {
            return val != null;
        }).join(sep);

    }

    if (!name) {
        return '';
    }
    return `${encodeURIComponent(stringifyPrimitive(name))}${eq}${encodeURIComponent(stringifyPrimitive(obj))}`;

};
