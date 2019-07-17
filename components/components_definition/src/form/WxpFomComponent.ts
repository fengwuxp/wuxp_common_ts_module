import {WxpComponent} from "../WxpComponent";
import {Formatter} from "fengwuxp_common_core/src/format/Formatter";
import {WxpFormEvent} from "./WxpFormEvent";

/**
 * 表单控件
 * @author wxup
 * @create 2018-09-04 18:50
 *
 * 1：表单元素控件显示和提交的时候往往是不同的，需要进行格式化
 * 2：表单元素初始化的过程肯能是同步的，也可能是异步，可以简单的认为都是异步
 * 3：表单元素控件的验证
 * 4：
 *
 * @param T 值类型
 **/
export interface WxpFomComponent<T> extends WxpComponent, WxpFormEvent,Formatter<T> {

    /**
     * 初始化方法
     * @param args
     */
    init?: (...args) => Promise<T>

    /**
     * 验证规则
     */
    validationRules: any[];

    /**
     * 获取值
     * @return T
     */
    getValue: () => T;

    /**
     * 设置值
     * @param args
     */
    setValue: (...args) => void;
}
