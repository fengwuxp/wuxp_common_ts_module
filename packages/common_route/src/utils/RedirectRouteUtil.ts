import StringUtils from "common_utils/src/string/StringUtils";
import {NavigatorAdapter, NavigatorDescriptorObject} from "../NavigatorAdapter";

/**
 * 获取重定向的路由信息
 * @param redirectUrl
 * @param redirectParams
 */
export const getRedirectRoute = (redirectUrl: string, redirectParams: any = {}) => {

    return {
        redirectUrl,
        redirectParams: JSON.stringify(redirectParams)
    }
};


/**
 * 处理重定向
 * @param navigatorAdapter 路由适配器
 * @param params           重定向的路由参数
 */
export const handleRedirect = <T extends NavigatorDescriptorObject = NavigatorDescriptorObject>(navigatorAdapter: NavigatorAdapter, params: T): void | Promise<any> => {

    if (!hasRedirect(params.queryParams)) {
        return null;
    }

    const queryParams = {
        ...params.queryParams
    };

    const pathname = queryParams.redirectUrl;
    const redirectParams = queryParams.redirectParams;
    delete queryParams.redirectUrl;
    delete queryParams.redirectParams;

    return navigatorAdapter.redirect({
        ...params,
        pathname,
        queryParams: redirectParams
    });

};

const hasRedirect = (queryParams: any) => {

    return StringUtils.hasText(queryParams.redirectUrl);
};
