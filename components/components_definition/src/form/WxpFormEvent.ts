/**
 * 表单事件
 * @author wxup
 * @create 2018-07-28 15:26
 **/

export interface WxpFormEvent extends Event {

    /**
     * 值发生改变
     * @param args
     */
    onChange?: (...args) => void;

    /**
     * 发生禁用
     * @param args
     */
    // onDisabled?: (...args) => void;

    /**
     * 发生错误
     * @param args
     */
    // onError:(...args)=>void;
}
