import {applicationBootstrap} from "../../../boot/WeexViewBootstrap";
import umengMixin from "../../../mixins/umeng/UmengMixin";
import CommonThemeControl from "common_style/src/CommonThemeControl";
import {weexTheme} from "../../../theme/js_default_theme";
import {enableImmersiveBottomBar, enableImmersiveNavBar} from "../../../condition/EnableImmersiveNavBar";
import AppConfigRegistry from "common_config/src/app/AppConfigRegistry";
import {getBottomBarHeight, getStatusBarHeight} from "../../../helper/FlexViewHelper";

//注入默认的主题变量
CommonThemeControl.injectThemes(weexTheme);

/**
 * 获取默认 props
 */
const getViewDefaultProps = () => {

    const {immersiveBottomBarColor, immersiveStatusBarColor} = AppConfigRegistry.getLayoutConfig();
    const navBarOptions = AppConfigRegistry.getNavBarOptions();

    return {

        flexViewStyle: {
            default: () => ({}),
            type: Object
        },

        /**
         * 开启沉浸式导航栏
         */
        enableImmersiveNavBar: {
            default: enableImmersiveNavBar(),
            type: Boolean
        },

        /**
         * 沉浸式导航栏颜色
         */
        immersiveStatusBarColor: {
            default: (immersiveStatusBarColor || navBarOptions.style.backgroundColor),
            type: String
        },

        /**
         * 沉浸式导航栏高度
         */
        immersiveStatusBarHeight: {
            default: 0,
            type: Number
        },


        /**
         * 开启沉浸式bottom bar
         */
        enableImmersiveBottomBar: {
            default: enableImmersiveBottomBar(),
            type: Boolean
        },

        /**
         * 沉浸式bottom bar高度
         */
        immersiveBottomBarHeight: {
            default: 0,
            type: Number
        },


        /**
         * 沉浸式bottom bar的颜色
         */
        immersiveBottomBarColor: {
            //默认透明
            default: immersiveBottomBarColor || "rgba(0,0,0,0)",
            type: String
        },
    }
};


/**
 * 由于weex是多页应用，所以在根页面入口要做 bootStartup
 */
export default {

    mixins: [umengMixin],
    props: {
        ...getViewDefaultProps()
    },
    data() {
        const layoutConfig = AppConfigRegistry.getLayoutConfig();
        return {
            defaultStyle: {
                ...(layoutConfig.style || {}),
                opacity: 0
            }
        };
    },
    computed: {
        viewStyle: {
            set(style) {
                this.flexViewStyle = style;
            },
            get() {
                const style = CommonThemeControl.resolveStyle({
                    backgroundColor: "fill-body"
                }, this.defaultStyle);


                return {
                    ...style,
                    ...this.flexViewStyle
                };
            }
        },

        /**
         * 沉浸式导航栏
         */
        immersiveStatusBarStyle() {
            return {
                width: `${weexTheme["render-width"]}px`,
                backgroundColor: this.immersiveStatusBarColor,
                height: `${this.immersiveStatusBarHeight}px`
            }
        },

        /**
         * 沉浸式底部bar
         */
        immersiveBottomBarStyle() {
            return {
                width: `${weexTheme["render-width"]}px`,
                backgroundColor: this.immersiveBottomBarColor,
                height: `${this.immersiveBottomBarHeight}px`
            }
        }
    },

    methods: {

        /**
         * 页面打开
         */
        viewAppear() {
            this.$emit("onViewAppear");
            this.reportUMengByIntoPage();

        },

        /**
         * 页面关闭
         * 备注：在安卓中通过back按钮返回的无法触发该事件。
         */
        viewDisappear() {
            this.$emit("onViewDisappear");
            this.reportUMengByDestroy();
        },

        /**
         * fadeIn的方式显示页面，防止页面显示的时候出现大幅度的抖动
         * @param opacity
         */
        fadeInView(opacity) {
            if (opacity === 1) {
                return;
            }
            opacity += 0.15;
            if (opacity >= 1) {
                opacity = 1;
            }
            setTimeout(() => {
                this.defaultStyle.opacity = opacity;
                this.fadeInView(opacity);
            }, 20);
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.fadeInView(0.1);
        });
    },
    beforeMount() {

        //初始化应用的的数据
        applicationBootstrap.startup()/*.then(({appRouter, appConfig, appRegistry}) => {
            const layoutConfig = appRegistry.getLayoutConfig();
            this.defaultStyle = {
                ...(layoutConfig.style || {}),
                opacity: 0
            }
        });*/


    },
    created() {

        //初始化状态栏
        getStatusBarHeight().then((height) => {
            this.immersiveStatusBarHeight = height;
        });

        getBottomBarHeight().then((height) => {
            this.immersiveBottomBarHeight = height;
        });
    }
}