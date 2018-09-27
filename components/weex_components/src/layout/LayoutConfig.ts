import * as CSS from 'csstype';


/**
 * 布局配置
 * @author wxup
 * @create 2018-09-27 9:11
 **/

export interface LayoutConfig {

    /**
     * view container的样式
     */
    style: CSS.Properties<string | number>;

    /**
     * 页面背景色
     */
    viewBackgroundColor?: CSS.BackgroundColorProperty;

    /**
     * 页面背景图
     */
    viewBackgroundImage?: string;

    /**
     * 头部配置
     */
    headerOptions: HeaderOptions;

    /**
     * 页面主体的样式
     */
    bodyStyle: CSS.Properties<string | number>;
}


/**
 * 头部配置
 */
interface HeaderOptions {

    /**
     * 头部背景图
     */
    backgroundImage?: string;

    /**
     * 返回图标
     */
    backIcon?: string;

    /**
     * 样式
     */
    style: CSS.Properties<string | number>;


    /**
     * 左侧区域样式
     */
    leftStyle: CSS.Properties<string | number>;

    /**
     * 中间区域
     */
    centerStyle: CSS.Properties<string | number>;

    /**
     * 右侧区域样式
     */
    rightStyle: CSS.Properties<string | number>;

    /**
     * ios 顶部样式
     */
    iosTopStyle: CSS.Properties<string | number>;
}
