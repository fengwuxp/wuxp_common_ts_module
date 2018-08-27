import {ServiceResp} from "./ServiceResp";
import {PageInfo} from "./PageInfo";

/**
 * 统一查询响应对象
 */
export interface ServiceQueryResp<T=any> extends ServiceResp<PageInfo<T>> {

    /**
     * 请求结果列表的第一个元素
     */
    readonly one: T,

    /**
     * 请求结果列表是否为空
     */
    readonly notEmpty: boolean
}
