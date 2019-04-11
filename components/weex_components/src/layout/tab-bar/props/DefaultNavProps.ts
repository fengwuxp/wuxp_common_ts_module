/**
 *
 * @author wxup
 * @create 2018-06-24 14:51
 **/

export default {

    /**
     * 页面 items 配置
     * @see {@link ./NavItem.ts}
     */
    viewItems: {
        required: true,
        default: () => []
    },

    /**
     * 默认选中的视图
     **/
    defaultViewIndex: {
        default: 0
    },

    /**
     * 导航item选中颜色
     **/
    itemSelectedColor: {
        required: true,
        default: null
    },

    /**
     * 导航item默认颜色
     **/
    itemDefaultColor: {
        required: true,
        default: null
    },
    /**
     * 导航栏样式
     **/
    navBarStyle: {
        default() {
            return {
                backgroundColor: "#ffffff",
                height: "100px",
                borderWidth: "1px",
                borderColor: "#e6e6e6",
                borderStyle: "solid"
            };
        }
    },
    /**
     * 导航栏背景图
     **/
    navBarBgImage: {
        default: ""
    },
    /**
     * 导航栏背景图样式
     **/
    navBarBgImageStyle: {
        default: {
            height: "100px",
            top: "0"
        }
    },

    /**
     * 居中大图标的style
     **/
    bigIconStyle: {
        default: {
            height: "120px",
            width: "120px",
            position: "absolute",
            left: "315px",
            bottom: 15
        }
    },

    /**
     * 导航项样式
     **/
    navItemStyle: {
        default: {
            height: "99px"
        }
    },
    /**
     * 导航图片样式
     **/
    navIconStyle: {
        default: {
            height: "40px",
            width: "40px",
            marginBottom: "9px"
        }
    },

    /**
     * 数值标记小圆点样式
     */
    numberDotStyle: {
        default: {
            right: "48px",
            top: "18px"
        }
    },

    dotStyle: {
        default: {
            left: "65px",
            top: "18px"
        }
    },

    /**
     * 在导航索引改变之前执行的函数
     */
    beforeChange: {
        default: null
    },

    /**
     * 切换导航栏图标的状态 选中=>未选中 或 未选中=>选中
     **/
    transformNavIcon: {
        default: function () {
            return (icon, isSelected) => {
                icon = icon.replace("nav/activate_", "nav/");
                if (isSelected) {
                    return icon.replace("nav/", "nav/activate_");
                } else {
                    return icon;
                }
            }
        }
    }
}
