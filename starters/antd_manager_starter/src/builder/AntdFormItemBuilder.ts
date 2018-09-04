import {FormItemBuilder} from "common_stater/src/builder/form/FormItemBuilder";
import * as React from "react";
import {WrappedFormUtils} from "antd/es/form/Form";


export default class AntdFormItemBuilder<T> implements FormItemBuilder<T> {

    private formWrapperUtils:WrappedFormUtils;

    public build = (): React.ReactNode => {

        const {getFieldDecorator}=this.formWrapperUtils;


        getFieldDecorator("",{
            rules:[
                {}
            ]
        })(null);


        return null;
    };

    props: (...args) => this;

    verify: (...args) => this;


}
