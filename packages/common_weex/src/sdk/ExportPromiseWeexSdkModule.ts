/*
* 将官方提供的sdk模块promise化
* */

import {picker} from "./ExportWeexSdkModule";
import {WeexPromiseModule} from "./module/WeexPromiseModule";
import {WeexPickerDateOptions, WeexPickerOptions, WeexPickerTimerOptions} from "weex/src/sdk/model/picker";
import {transformPromiseByProxy} from "./TransformPromiseByProxy";


/**
 * promise picker date
 */
export interface WeexPrickPromiseModule extends WeexPromiseModule {

    readonly pickDate: (options: WeexPickerDateOptions) => Promise<string>;

    readonly pickTime: (options: WeexPickerTimerOptions) => Promise<string>;

    readonly pick: (options: WeexPickerOptions) => Promise<number>;
}

//
export const promisePicker:WeexPrickPromiseModule = transformPromiseByProxy(picker);