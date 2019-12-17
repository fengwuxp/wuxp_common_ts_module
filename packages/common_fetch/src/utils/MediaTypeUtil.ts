import {HttpMediaType} from "../constant/http/HttpMediaType";


const UTF_8 = ";charset=UTF-8";

/**
 * 2个MediaTye 是否相同
 * @param type1
 * @param type2
 */
export const isEq = (type1: HttpMediaType, type2: HttpMediaType) => {

    if (type1 === type2) {
        return true;
    }
    return type1.replace(UTF_8, "") === type2.replace(UTF_8, "");
};
