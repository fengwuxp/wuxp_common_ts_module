import StringUtils from "fengwuxp_common_utils/src/string/StringUtils";


/**
 * 过滤无效数据
 * @param data
 */
export const filterNoneData = (data) => {
    const newData = {};
    for (const key in data) {
        const value = data[key];
        if (value == null) {
            continue;
        }
        if (typeof value === "number" && isNaN(value)) {
            continue
        }
        if (typeof value === "string") {
            if (!StringUtils.hasText(value)) {
                continue;
            }
        } else if (Array.isArray(value)) {
            if (value.length === 0) {
                //过滤空数组，querystring stringify方法实现没有判断空数组
                continue
            }
        }
        newData[key] = value;
    }
    return newData;
};
