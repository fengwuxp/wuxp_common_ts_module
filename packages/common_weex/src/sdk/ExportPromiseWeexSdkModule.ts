/*
* 将官方提供的sdk模块promise化
* */

import {dom, picker} from "./ExportWeexSdkModule";
import {WeexPromiseModule} from "./module/WeexPromiseModule";
import {WeexPickerDateOptions, WeexPickerOptions, WeexPickerTimerOptions} from "weex/src/sdk/model/picker";
import {standardizedWeexModuleToPromise} from "./standardization/StandardizationHelper";
import {WeexComponentRect, WeexComponentRectSize, WeexDomScrollOptions, WeexRuleOptions} from "weex/src/sdk/model/dom";


/**
 * promise picker date
 */
export interface WeexPrickPromiseModule extends WeexPromiseModule {

    readonly pickDate: (options: WeexPickerDateOptions) => Promise<string>;

    readonly pickTime: (options: WeexPickerTimerOptions) => Promise<string>;

    readonly pick: (options: WeexPickerOptions) => Promise<number>;
}

//picker
export const promisePicker: WeexPrickPromiseModule = standardizedWeexModuleToPromise({module: picker});


export interface WeexDomPromiseModule extends WeexPromiseModule {

    /**
     * 让页面滚动到 ref 对应的组件，这个 API 只能用于可滚动组件的子节
     * @param ref
     * @param {WeexDomScrollOptions} options
     */
    readonly  scrollToElement: (ref: any, options: WeexDomScrollOptions) => void;

    /**
     * 标签的 ref 获得其布局信息
     * @param ref
     * @param {(result: WeexComponentRect) => void} callback
     */
    readonly  getComponentRect: (ref: any) => Promise<WeexComponentRectSize>;

    /**
     * addRule是可以为dom 添加一条规则，目前支持自定义字体fontFace规则，构建自定义的font-family，可以在text使用
     * @param {string} name 规则名称
     * @param {WeexRuleOptions} options
     */
    readonly  addRule: (name: string, options: WeexRuleOptions) => void;
}


export const domPicker: WeexDomPromiseModule = standardizedWeexModuleToPromise({
    module: dom,
    transformCallback: (resolve, reject) => {
        return [
            ({result, size}: WeexComponentRect) => {

                return result ? resolve(size) : reject();
            }
        ]
    }
});