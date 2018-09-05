import {WxpFomComponent} from "components_definition/src/form/WxpFomComponent";
import * as React from "react";
import {WrappedFormUtils} from "antd/lib/form/Form";


let WrappedFormUtils:WrappedFormUtils;

/**
 * 高阶组件
 * 表单组件的包装者
 * @author wxup
 * @create 2018-09-05 10:49
 **/
export function WrapperFormItem<C extends W, W extends WxpFomComponent<any> = WxpFomComponent<any>>(reactComponent, c: W): C {

    //合并
    return Object.assign(reactComponent, c) as any;
}


function wrapper(options,c) {

    const {getFieldDecorator}=WrappedFormUtils;

  return  getFieldDecorator("",options)(c);

}
