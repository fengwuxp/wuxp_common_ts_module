import {WeexModule} from "../../../../index";


/**
 * weex webview
 * https://weex.apache.org/cn/references/modules/webview.html
 */
export interface WeexWebviewModule extends WeexModule {

    /**
     * 前往 WebView 历史记录的上一页。
     * @param element <web> 组件元素。
     */
    readonly  goBack: (element: any) => void;

    /**
     * 前往 WebView 历史记录的下一页。
     * @param element
     */
    readonly goForward: (element: any) => void;

    /**
     * 刷新当前 Web 页面。
     * @param element
     */
    readonly reload: (element: any) => void;
}
