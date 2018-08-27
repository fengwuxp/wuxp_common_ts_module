import {isNullOrUndefined} from "util";


/**
 * 从数组中移除一个元素
 * @param {Array<any>} list
 * @param obj
 * @param {string} equalsKey
 */
export const removeToArray = (list: Array<any>, obj: any, equalsKey = 'key') => {

    let index = indexOfToArray(list, obj, equalsKey);

    if (index > -1) {
        list.splice(index, 1);
    }
};

/**
 * 确定某个元素在数组中的位置
 * @param {Array<any>} list
 * @param obj
 * @param {string} equalsKey
 * @return {number}
 */
export const indexOfToArray = (list: Array<any>, obj: any, equalsKey = 'key') => {
    let index = -1;
    let b = list.some((item, i) => {

        index = i;
        if (isNullOrUndefined(equalsKey)) {
            return item === obj;
        }
        return item[equalsKey] === obj[equalsKey];
    });

    if (!b) {
        return -1;
    }

    return index;

};
