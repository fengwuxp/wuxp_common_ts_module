/**
 * 发布者
 */
export interface Publisher<T = any> {

    /**
     * 发布
     * @param data 被发布的数据
     */
    publish: (data: T) => void;
}