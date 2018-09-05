import Input, {InputProps} from "antd/es/input/Input";
import {WxpTextInput} from "components_definition/src/form/input/WxpTextInput";
import {Locale} from "common_core/src/in81/Locale";
import * as React from "react";
import {WrapperFormItem} from "../WrapperFormItem";
import {ValidationRule} from "antd/es/form";

/**
 * 文本输入框
 * @author wxup
 * @create 2018-09-04 21:08
 **/
export interface TextInputProps extends InputProps {


}

export interface TextInput<P, S> extends React.Component<P, S>, WxpTextInput {

}


export default class  extends Input implements TextInput<TextInputProps, any> {

    validationRules: ValidationRule[];


    getValue: () => string;

    init: (...args) => Promise<string>;

    parse: (text: string, local?: Locale) => string;

    print: (object: string, local?: Locale) => string;

    setValue: (...args) => void;





}


// export default WrapperFormItem<TextInput, WxpTextInput>(Input, {
//     getValue: function () {
//         return this.props.value;
//     },
//     init: function (p1) {
//         return undefined;
//     },
//     onChange: function (p1) {
//     },
//     parse: function (text: string, p2: Locale) {
//         return text;
//     },
//     print: function (object: string, p2: Locale) {
//         return object;
//     },
//     setValue: function (val: string) {
//     },
//
//     validationRules: []
//
// });
