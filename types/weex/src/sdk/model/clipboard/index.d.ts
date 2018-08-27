/**
 * 剪贴板
 * https://weex.apache.org/cn/references/modules/clipboard.html
 */
import {WeexModule} from "../../../../index";

export interface WeexClipboardModule extends WeexModule {

    /**
     * 获取剪贴板的内容
     * @param {(result: WeexClipboardResult) => void} callback
     */
    readonly getString: (callback: (result: WeexClipboardResult) => void) => void;

    /**
     * 设置内容到剪版
     * @param {string} text
     */
    readonly setString: (text: string) => void;
}

/**
 * 剪贴板回调
 */
export interface WeexClipboardResult {

    /**
     * 获取到的文本内容
     */
    readonly data: string;

    /**
     * 可能为 success 或 fail
     */
    readonly result: string;
}
