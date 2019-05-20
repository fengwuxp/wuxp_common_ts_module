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

    ladingText: {
        default: "数据加载中..."
    },

    /**
     * 下拉刷新动画帧的切换间隔
     */
    frameTimes: {
        default: 130
    },

    /**
     * 查询大小
     */
    querySize: {
        default: 10
    },

    /**
     * 距离底部触发加载更多事件的距离
     * 如果是 list组件由于有原生实现的问题，loadMoreOffset至少要大于list中一个元素的高度
     */
    loadMoreOffset: {
        default: 200
    },

    /**
     * 加载跟多的方法
     * 传入查询大小和查询页码
     * @param isRefresh 是否为下拉刷新（重置）
     * 返回查询到的数据条数
     * ({
     *     querySize:number,
     *     queryPage:number
     * },isRefresh:boolean)=>Promise<number>
     */
    loadMore: {
        default: null,
        type: Function
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