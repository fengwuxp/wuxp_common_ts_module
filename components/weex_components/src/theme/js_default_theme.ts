import * as CSS from 'csstype';
import {StyleTheme} from "common_style/src/CommonThemeControl";

/**
 * weex主题样式列表
 */
interface WeexStyleTheme extends StyleTheme {

    //主字号颜色
    "color-text-base": CSS.Color
}

export const weexTheme: WeexStyleTheme = {

    "color-text-base": "#000"
};