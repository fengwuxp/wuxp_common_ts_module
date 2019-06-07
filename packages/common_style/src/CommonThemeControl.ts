import * as CSS from 'csstype';


/**
 * 通用的js样式的控制
 */
export default class CommonThemeControl {

    //主题样式
    private static THEME_MAP: StyleTheme = {};


    /**
     * 注入主题配置列表
     * @param themes
     */
    static injectThemes = (themes: StyleTheme) => {
        CommonThemeControl.THEME_MAP = {
            ...CommonThemeControl.THEME_MAP,
            ...themes
        };
    };

    /**
     * 获取样式属性
     * @param cssAttrName
     */
    static getStyleAttrByName = (cssAttrName: string) => {
        return CommonThemeControl.THEME_MAP[cssAttrName];
    };

    /**
     * 解析样式
     * @param themes 主题描述 key：css属性名称 value：主题变量名称
     * @param style  期望覆盖的目标样式
     */
    static resolveStyle<K extends keyof CSS.Properties<string | number>>(themes: Record<K, string>, style: CSS.Properties): CSS.Properties<string | number> {


        const themeStyle: CSS.Properties<string | number> = {};

        for (const cssAttrName in themes) {

            const styleValue = CommonThemeControl.THEME_MAP[themes[cssAttrName]];
            if (styleValue) {
                themeStyle[cssAttrName as string] = styleValue;
            }
        }
        return {
            ...style,
            ...themeStyle
        };
    }

}

export interface StyleTheme {
    [key: string]: string | number;
}

