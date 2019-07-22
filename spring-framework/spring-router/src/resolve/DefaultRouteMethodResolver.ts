import {RouteMethodResolver} from "./RouteMethodResolver";
import StringUtils from "fengwuxp_common_utils/src/string/StringUtils";


const URI_SYMBOL_SLASH = "/";
const URI_SYMBOL_COLON = ":";

//替换冒号的符号
const REPLACE_COLON_SYMBOL = "$";

/**
 * 默认的解析者
 */
export default class DefaultRouteMethodResolver implements RouteMethodResolver {


    methodNameToUri = (methodName: string) => {
        if (!StringUtils.hasText(methodName)) {
            return null;
        }



        return methodName.replace(/[A-Z]+/g,(s)=>{

            return `/${s.toUpperCase()}`
        }).replace(REPLACE_COLON_SYMBOL,URI_SYMBOL_COLON);
    };

    uriToMethodName = (uri: string) => {
        if (!StringUtils.hasText(uri)) {
            return null;
        }

        const chars = uri.split("");

        return chars.map((item, index) => {
            switch (item) {
                case URI_SYMBOL_SLASH:
                    //斜杠转驼峰
                    const nextChart = chars[index + 1].toUpperCase();
                    chars[index + 1] = nextChart;
                    return "";
                case URI_SYMBOL_COLON:
                    return REPLACE_COLON_SYMBOL;
            }
            return item;
        }).join("");


    };


}