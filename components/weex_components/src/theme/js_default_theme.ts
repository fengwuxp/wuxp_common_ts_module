import * as CSS from 'csstype';
import {StyleTheme} from "common_style/src/CommonThemeControl";

/**
 * weex主题样式列表
 */
interface WeexStyleTheme extends StyleTheme {

    //设备宽度
    "render-width": number;

    //主字号颜色
    "color-text-base": CSS.Color;
}

export const weexTheme: WeexStyleTheme = {

    "render-width": 750,
    "color-text-base": "#000"
};