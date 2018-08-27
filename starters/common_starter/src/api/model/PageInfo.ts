import {QueryType} from "common_fetch/src/enums/QueryType";

/**
 * 统一分页对象
 */
export interface PageInfo<T = any> {

    readonly  total: number;

    readonly  records: Array<T>

    readonly  queryType: QueryType

    readonly  queryPage: number;

    readonly querySize: number
}
