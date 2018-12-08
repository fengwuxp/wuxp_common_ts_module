import {ComponentBuilder} from "../ComponentBuilder";


/**
 * 表单构建者
 * @param T 表单预期的组件组合
 */
export interface FormBuilder<T> extends ComponentBuilder<T> {


    verify: (...args) => this;

    /**
     * 第一行
     */
    firstRow: () => this;

    /**
     * 最后一行
     */
    lastRow: () => this;

    /**
     * 下一行
     */
    nextRow: () => this;


}


// builder.name(Input).verify()
//     .props({}).build();