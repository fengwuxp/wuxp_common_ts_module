import * as CSS from 'csstype';


/**
 * weex 样式的控制
 */
export default class WeexThemeControl {

    //主题样式
    private static themes: WeexThemeStyle = {};


    /**
     * 注入主题配置列表
     * @param themes
     */
    static injectThemes = (themes: WeexThemeStyle) => {
        WeexThemeControl.themes = themes;
    };

    /**
     * 获取样式属性
     * @param cssAttrName
     */
    static getStyleAttrByName = (cssAttrName: string) => {
        return WeexThemeControl.themes[cssAttrName];
    };

    /**
     * 解析样式
     * @param themes 主题描述 key：css属性名称 value：主题属性名称
     * @param style
     */
    static resolveStyle<K extends keyof CSS.Properties<string | number>>(themes: Pick<CSS.Properties<string | number>, K>, style: CSS.Properties): CSS.Properties<string | number> {


        const themeStyle: CSS.Properties<string | number> = {};

        for (const cssAttrName in themes) {
            const styleValue = WeexThemeControl.themes[themes[cssAttrName]];
            if (styleValue) {
                themeStyle[cssAttrName] = styleValue;
            }
        }
        return {
            ...style,
            ...themeStyle
        };
    }

}

export interface WeexThemeStyle {
    [key: string]: string | number;
}

