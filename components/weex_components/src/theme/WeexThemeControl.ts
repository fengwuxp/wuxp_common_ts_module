/**
 * weex 样式的控制
 */
export default class WeexThemeControl {

    private static colors = {};

    /**
     * 注入颜色列表
     * @param colors
     */
    static injectColors = (colors) => {
        WeexThemeControl.colors = colors;
    };

    /**
     * 获取颜色列表
     * @param name
     */
    static getColorByName = (name: string) => WeexThemeControl.colors[name];

}