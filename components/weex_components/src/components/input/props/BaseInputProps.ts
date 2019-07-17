import CommonThemeControl from "fengwuxp_common_style/src/CommonThemeControl";

export default {


    /**
     * 输入框类型
     */
    type: {
        default: "text"
    },

    /**
     * 默认值
     */
    defaultValue: {
        default: null
    },

    containerStyle: {
        default: () => ({
            padding: "20px",
        })
    },


    /**
     * 输入框标题
     */
    label: {
        default: ""
    },
    labelStyle: {
        default: () => ({
            fontSize: "32px",
            lineHeight: "32px",
            height: "32px",
            color: CommonThemeControl.getStyleAttrByName("color-text-base")
        })
    },

    /**
     * 标签容器样式
     */
    labelContainerStyle: {
        default: () => ({})
    },

    /**
     * 输入框左侧icon
     */
    labelIcon: {
        default: ""
    },

    labelIconStyle: {
        default: () => ({
            width: "45px",
            height: "45px"
        })
    },

    labelSlot: {
        default: false
    },
    rightSlot: {
        default: false
    },

    inputStyle: {
        default: () => ({
            fontSize: "32px",
            lineHeight: "50px",
            height: "50px",
            color: CommonThemeControl.getStyleAttrByName("color-text-base")
        })
    },

    /**
     * 输入的最大长度
     */
    maxLength: {
        default: 255
    },

    /**
     * 提示文字
     */
    placeholder: {
        default: ""
    },

    /**
     * 是否使用清除图标
     */
    useClear: {
        default: true
    },

    /**
     * 自动获取焦点
     */
    autoFocus: {
        default: false
    },

    /**
     * 输入检查
     * 可以返回true表示检查通过，
     * 或者是返回一个新的值
     */
    checkInput: {
        default: () => function (val) {
            return this.value !== val;
        }
    },

    /**
     * 显示打印函数
     */
    print: {
        default: () => (val) => val
    },

    /**
     * 格式化函数
     */
    formatter: {
        default: () => (val) => val == null ? val : val.toString().trim()
    },

    /**
     * 清除图标的样式
     */
    clearIconStyle: {
        default: () => ({
            fontSize: "40px",
            color: "#cccccc"
        })
    }
}