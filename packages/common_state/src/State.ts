/**
 * 状态存储
 *   1：初始化
 *   2: 值被改变是将会发出广播
 * @author wxup
 * @create 2018-11-02 16:54
 **/
export interface State<T> {


    /**
     * 状态
     */
    sate: T;


    /**
     * 订阅
     * @param listener
     */
    subscribe: (listener: Listener) => void;
}


export type Listener = () => void