import {debounce} from "common_utils/src/timer/DebounceUtil";
import {weexToast} from "common_weex/src/toast/WeexToast";
import AppRouterHelper from "../route/AppRouterHelper"

//点击次数
let MAX_CLICK_COUNT: number = 3;

const DEV_VIEW_URL: string = "dev_view";

/**
 * 打开开发者页面
 */
export default class OpenDevPageUtil {

    static openDevInfoView = () => {
        if (MAX_CLICK_COUNT) {
            MAX_CLICK_COUNT--;
            weexToast(`再点击${MAX_CLICK_COUNT}次打开开发者页面`);
        }
        OpenDevPageUtil.jumpDevView(DEV_VIEW_URL);
    };
    private static jumpDevView = debounce(2000, function (url) {
        if (MAX_CLICK_COUNT === 0) {
            AppRouterHelper.toView(url);
        }
        MAX_CLICK_COUNT = 3;
    })
}