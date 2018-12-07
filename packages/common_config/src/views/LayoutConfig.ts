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
     * 导航栏配置
     */
    navBarStyleOptions: NavBarStyleOptions;

    /**
     * 页面主体的样式
     */
    bodyStyle: CSS.Properties<string | number>;
}


/**
 * 导航栏配置
 */
export interface NavBarStyleOptions {

    /**
     * 导航栏背景图
     */
    backgroundImage?: string;

    /**
     * 返回图标
     */
    backIcon?: string;

    /**
     * 返回图标样式
     */
    backIconStyle?: CSS.Properties<string | number>;

    /**
     * 样式
     */
    style?: CSS.Properties<string | number>;


    /**
     * 左侧区域样式
     */
    leftStyle?: CSS.Properties<string | number>;

    /**
     * 中间区域
     */
    centerStyle?: CSS.Properties<string | number>;

    /**
     * 导航标题样式
     */
    navTitleStyle: CSS.Properties<string | number>;

    /**
     * 右侧区域样式
     */
    rightStyle?: CSS.Properties<string | number>;

    /**
     * 沉浸式状态栏颜色
     */
    immersiveStatusBarColor?: CSS.BackgroundColorProperty;
}
