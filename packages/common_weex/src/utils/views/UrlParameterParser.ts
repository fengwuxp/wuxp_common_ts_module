import StringUtils from "common_utils/src/string/StringUtils";
import {DEFAULT_PARAM_KEY_NAME} from "common_route/src/adapter/weex/WeexNavigatorAdapter";
import StringToHexUtil from "common_utils/src/codec/StringToHexUtil";
import {parse} from "querystring";

/**
 * url参数解析者
 * @author wxup
 * @create 2018-10-06 12:47
 **/
export function urlParameterParser<T = any>(): T {
    let params: T = {} as  T;

    const bundleUrl = weex.config.bundleUrl;

    let queryStr = bundleUrl.split("?")[1];  //获取查询字符串

    if (!StringUtils.hasText(queryStr)) {
        //如果不存在查询字符串则直接返回
        return params;
    }

    let _pString = queryStr.split("&")[0];  //获取第一个参数
    if (!StringUtils.hasText(_pString)) {
        return params;
    }


    //是否被hex处理过
    const isDecode = _pString.indexOf(DEFAULT_PARAM_KEY_NAME) >= 0;

    if (isDecode) {
        //获取实际被处理过的16进制的参数
        _pString = _pString.split("=")[1];
        if (StringUtils.hasText(queryStr)) {
            //16进制转10进制
            queryStr = StringToHexUtil.decode(_pString);
            console.log("16进制转10进制-> " + _pString);
        }
    }

    let result = parse(queryStr);
    //处理布尔值
    for (let key in result) {
        let param: any = result[key];
        if (param === "false") {
            param = false;
        }
        if (param === "true") {
            param = true;
        }
        params[key] = param;
    }
    console.log("参数-->" + JSON.stringify(params));
    return params;
}
