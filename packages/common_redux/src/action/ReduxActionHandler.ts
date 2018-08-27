import {ReduxAction} from "./ReduxAction";


/**
 * redux action handler
 * 用来规范化调用 redux
 *
 * reducer 的职责是将数据set到store中
 * action  的职责是获取来自外界的数据，按照state的数据结构将数据传递给对应的reducer
 *
 * reducer 方法接收2个参数，第一个为新的state,第二个为旧的state，最终返回全新的state
 * action  方法接收一个参数，参数的内容表示新的state的子集或者是新的state
 *
 *
 * -------------------------------------------------
 *
 * 1.将reducer的每一个type方法化
 * 2.通过代理工厂生产一个reducer的实例，并返回一个reducer的holder
 * 3.在action中调用reducer holder
 *
 * class TestAction{
 *
 *     add(num,sate){
 *
 *         return {
 *             ...state,
 *             num
 *         }
 *     }
 *
 * }
 *
 * class TestAction{
 *
 *     private testReducerHolder;
 *
 *     fetchDta=(req)=>{
 *
 *         xxxService.fetchData(req).then((resp)=>{
 *
 *             this.testReducerHolder.setUserList({
 *                 users:resp.list
 *             });
 *
 *         }).catch(({message})=>{
 *             this.testReducerHolder.setError({
 *                 message
 *             })
 *         })
 *
 *     }
 *
 *     updateLocalUserInfo=(user)=>{
 *
 *         let state=this.context.getState(this.testReducerHolder);
 *
 *         state.some(()=>{
 *             ...find index
 *         })
 *         //update
 *         state.users[index]=user;
 *
 *         //auto call this.setReducerHolder.setUserList
 *
 *     }
 *
 *
 *     在reducer 和action 中间抽一层  用于代理action
 *        1：在action 调用完成后自动广播数据到reducer（同步或异步的方法，通过装饰器来标记自动调用的方法，如果没有，则手动调用）
 * }
 *
 *  参考 redux-saga的思路 使用generator 函数将action 分发出去
 *
 *  action  就是一个个事件
 *  reducer 就是订阅事件的observer
 *
 *
 *
 */


export interface ReduxActionHandler<T = any> {

    /**
     * 发送一个action
     * @param action
     */
    putEvent: (action: ReduxAction<T> | any) => any;

}