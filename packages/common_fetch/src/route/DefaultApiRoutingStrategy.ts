import {ApiRoutingMapping, ApiRoutingStrategy} from "./ApiRoutingStrategy";


/**
 * 默认的路由解析策略
 */
export default class DefaultApiRoutingStrategy implements ApiRoutingStrategy {

    protected routeMapping: ApiRoutingMapping;


    constructor(routeMapping: ApiRoutingMapping) {
        this.routeMapping = routeMapping;
    }

    route = (url: string): string => {
        if (/^(http|https)/.test(url)) {
            //uri
            return normalizeUrl(url);
        }
        if (!/^(@)/.test(url)) {
            throw  new Error(`illegal routing url -> ${url}`);
        }

        //抓取api模块名称并且进行替换
        const searchValue = /^@(.+?)\//;

        return normalizeUrl(url.replace(searchValue, ($1, $2) => {
            const domain = this.routeMapping[$2];
            return domain.endsWith("/") ? domain : `${domain}/`;
        }));
    };


}

/**
 * Remove duplicate slashes if not preceded by a protocol
 * @param url
 */
const normalizeUrl = (url: string): string => {
    return url.replace(/((?!:).|^)\/{2,}/g, (_, p1) => {
        if (/^(?!\/)/g.test(p1)) {
            return `${p1}/`;
        }

        return '/';
    });
};
