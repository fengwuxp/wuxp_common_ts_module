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
            return url;
        }
        if (!/^(@)/.test(url)) {
            throw  new Error(`illegal routing url -> ${url}`);
        }

        //抓取api模块名称并且进行替换
        const searchValue = /^@(.+?)\//;

        return url.replace(searchValue, ($1, $2) => {

            return `${this.routeMapping[$2]}/`;
        })
    };


}