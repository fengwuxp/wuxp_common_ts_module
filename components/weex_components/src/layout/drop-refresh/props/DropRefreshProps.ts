/**
 * 下拉刷新的props
 */
export default {

    /**
     * 刷新的图标样式
     */
    refreshImageStyle: {
        default: {
            width: "60px",
            height: "60px"
        }
    },

    /**
     * 刷新的容器样式
     */
    refreshContainerStyle: {
        default: {
            width: "750px",
            justifyContent: "center"
        }
    },
    /**
     * 刷新的内容样式
     */
    refreshContentStyle: {
        default: {}
    },

    /**
     * 刷新动画图片数组长度
     * 刷新的图片依据约定的规则放到固定的目录
     * images/animation/pull_to_refresh_people_{index}.png
     */
    imagesLength: {
        default: 5
    },
    refreshTitle: {
        default: ""
    },

    pullDownTipText: {
        default: "松开后刷新"
    },
    refreshTipText: {
        default: "正在加载中"
    },
    frameTimes: {
        default: 130
    },

    loadMoreOffset: {
        default: 200
    },


    /**
     * 在 indicatorModel='indicator' 时生效
     */
    indicatorStyle: {
        default: {
            width: "60px",
            height: "60px"
        }
    },
    /**
     * 刷新的  indicator样式
     * 支持的只有3个  default, indicator,custom
     */
    indicatorModel: {default: "default"} //使用默认的动画效果
}