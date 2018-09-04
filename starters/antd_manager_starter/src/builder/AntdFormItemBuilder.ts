import {FormItemBuilder} from "common_starter/src/builder/form/FormItemBuilder";
import * as React from "react";
import {WrappedFormUtils} from "antd/es/form/Form";


/**
 * 表单项组件构建器
 *
 *
 */
export default class AntdFormItemBuilder implements FormItemBuilder<React.ReactNode> {

    private formWrapperUtils: WrappedFormUtils;

    public build = (): React.ReactNode => {

        const {getFieldDecorator} = this.formWrapperUtils;


        getFieldDecorator("", {
            rules: [
                {}
            ]
        })(null);


        return null;
    };

    props: (...args) => this;

    verify: (...args) => this;

}

function wrapperFormComponent<T extends React.Component>(c: T): T {

    return null;
}




