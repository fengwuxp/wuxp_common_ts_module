
import {LocationDescriptorObject} from "history";

/**
 * 导航器适配器
 */
export interface NavigatorAdapter {


    push: (params: NavigatorParam) => void;

    /**
     * 返回
     * @param num
     */
    goBack: (num?: number, callback?: (...args) => void) => void;

    /**
     * 前进
     */
    goForward?: () => void;
}

export interface NavigatorParam extends LocationDescriptorObject {


    animated?: boolean;

    callback?: (...args) => void;
}