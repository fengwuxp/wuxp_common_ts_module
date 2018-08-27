/**
 * 分页查询helper
 */
export interface PagingQueryHelper<T = any> {

    /**
     * 查询下一页
     * @param args
     */
    queryNextPage: (...args) => Promise<T>;

    /**
     * 重置查询
     * @param args
     */
    restQuery: (...args) => Promise<T>;


    /**
     * @param args
     * 统计查询总数
     */
    countTotal?: (...args) => number;


    /**
     * 是否还有下一页数据
     * @param currentSize
     */
    hasNextPage: (currentSize: number) => boolean;

    /**
     * 是否处于加载中状态
     */
    isLoading: () => boolean;
}