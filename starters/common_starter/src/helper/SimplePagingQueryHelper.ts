import {PagingQueryHelper} from "./PagingQueryHelper";
import {PageInfo} from "../api/model/PageInfo";
import {FetchOptions, FetchResponse} from "common_fetch/src/fetch/FetchOptions";
import {ServiceQueryEvt} from "../api/model/ServiceQueryEvt";


/**
 * simple handle
 */
export type SimpleQueryHandle<T = any, Q extends ServiceQueryEvt = ServiceQueryEvt> = (req: Q, options?: FetchOptions) => Promise<FetchResponse<PageInfo<T>>>;

/**
 * simple query helper
 */
export default class SimplePagingQueryHelper<T = any> implements PagingQueryHelper<FetchResponse<PageInfo<T>>> {


    /**
     * 每页查询大小
     */
    protected querySize: number;

    /**
     * 查询页码，如果为-1表示不分页
     */
    protected queryPage: number;

    /**
     * 总条目数，默认情况下为-1
     */
    protected total: number = -1;

    /**
     * 是否处于查询中
     */
    protected loading: boolean = false;


    //查询处理者
    protected queryHandle: SimpleQueryHandle<T, ServiceQueryEvt>;

    constructor(queryHandle: SimpleQueryHandle<T, ServiceQueryEvt>,
                querySize: number = 10,
                queryPage: number = 1) {
        this.queryHandle = queryHandle;
        this.querySize = querySize;
        this.queryPage = queryPage;
    }


    /**
     * 查询下一页数据
     * @param req
     * @param options
     */
    queryNextPage<Q extends ServiceQueryEvt>(req: Q, options?: FetchOptions): Promise<FetchResponse<PageInfo<T>>> {

        this.loading = true;


        return this.queryHandle({
            ...(req as any),
            queryPage: this.queryPage,
            querySize: this.querySize,
        }, options)['finally']((response: FetchResponse<PageInfo<T>>) => {
            this.loading = false;
            this.queryPage++;
            return response;
        });
    };

    /**
     * 重置
     * @param req
     * @param options
     */
    restQuery<Q extends ServiceQueryEvt>(req: Q, options?: FetchOptions): Promise<FetchResponse<PageInfo<T>>> {
        this.queryPage = 1;
        return this.queryNextPage(req, options)
    };


    /**
     * 下一页是否还有数据
     * @param currentSize 本次查询结果的条目数
     */
    public hasNextPage = (currentSize: number) => {
        if (this.total === -1) {
            //本次查询结果是否等于当前查询大小，如果小于则表示查询结束
            return currentSize === this.querySize;
        } else {
            return this.queryPage * this.querySize + currentSize <= this.total
        }
    };

    /**
     * 是否处于查询中
     */
    public isLoading = () => this.loading;

}