import BaseIcon from "./base-icon";

/**
 * vue icon
 * @author wxup
 * @create 2018-10-10 11:38
 **/
export default {
    components: {
        BaseIcon
    },
    props: {
        name: {
            default: null,
            type: String
        },
        size: {
            default: null,
            type: Number
        },
        color: {
            default: null,
            type: String
        },
        classNames: {
            default: null,
            type: String
        },
        style: {
            default: null
        }
    },
    data() {
        return {
            fontFamily: null,
            glyphMap: null
        }
    },
    render(createElement, hack) {
        //使用render函数统一创建组件
        const {fontFamily, glyphMap, style, classNames, color, size, name} = this;

        return createElement("base-icon", {
            props: {
                fontFamily,
                glyphMap,
                style,
                classNames,
                color,
                size,
                name
            },
            on: {
                click(evnet) {
                    this.$emit("onClick", evnet);
                }
            }
        })
    }
}
