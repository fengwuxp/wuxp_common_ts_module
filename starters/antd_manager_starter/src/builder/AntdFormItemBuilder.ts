import {FormItemBuilder} from "common_stater/src/builder/form/FormItemBuilder";


export default class AntdFormItemBuilder<T> implements FormItemBuilder<T> {

    build: () => any;

    props: (...args) => this;

    verify: (...args) => this;



}