import {imageLoader} from "typescript_api_sdk/src/utils/ExpotrtWeexCustomModel";
import commonUtils from "wxp_weex_components/src/utils/CommonUtils";
import {isWeb} from "typescript_api_sdk/src/utils/WeexEnvUtil";
import {DEFAULT_FN_NAME, DEFAULT_WIDTH, BACKGROUND_COLOR, BORDER_COLOR} from "../const/ConstKey";
import HLine from "../components/line/h-line";
import VLine from "../components/line/v-line";

/**
 * margin属性
 * @type {string[]}
 */
const MARGIN_ATTR_LIST = ["marginTop", "marginRight", "marginBottom", "marginLeft"];

const deviceWidth = weex.config.env.deviceWidth;

const rpx = deviceWidth / DEFAULT_WIDTH;

export default {
    components: {
        HLine,
        VLine
    },
    props: {
        items: {default: []},
        uiFloor: {default: {}},
        /**
         * 组件渲染的宽度，默认750
         */
        renderWidth: {
            default: DEFAULT_WIDTH
        },
        /**
         * 组件渲染背景色 默认 #ffffff
         */
        renderBackgroundColor: {
            default: BACKGROUND_COLOR
        },
        /**
         * 组件分割线颜色 默认 #e6e6e6
         */
        renderBorderColor: {
            default: BORDER_COLOR
        },
        rpx: {
            default: rpx
        }
    },
    data() {
        let {floorHeight} = this.uiFloor;
        if (commonUtils.isNullOrUndefined(floorHeight)) {
            //-1表示自动
            floorHeight = -1;
        }

        //是否使用图片加载器
        const useImageLoad = floorHeight == null || floorHeight <= 0;
        return {
            web: isWeb(),
            useImageLoad,
            floorHeight
        };
    },
    computed: {
        /**
         * margin 处理
         * @return {{}}
         */
        marginHandle() {
            const {margin} = this.uiFloor;
            const style = {};
            if (!commonUtils.hasText(margin)) {
                return style;
            }
            //margin处理
            const s = margin.split(" ");
            s.forEach((val, i) => {
                if (val.trim().length === 0) {
                    return;
                }
                style[MARGIN_ATTR_LIST[i]] = val.indexOf("px") >= 0 ? val : val + "px";
            });
            return style;
        }
    },
    methods: {
        clickHandle(item) {
            console.log(item);
            this.$emit(DEFAULT_FN_NAME, item);
        },

        loadImageByNative(width) {
            if (!this.useImageLoad) {
                //不使用图片加载器
                console.warn("请使用 floorHeight");
                return;
            }
            if (commonUtils.isNullOrUndefined(this.items[0])) {
                return
            }
            let {content} = this.items[0];
            if (!commonUtils.hasText(content)) {
                console.warn("内容不存在-> " + content);
                return;
            }
            console.log("加载图片-->");
            console.log("content-> " + content + " width=" + width);
            imageLoader.loadImageInfo(content, width, (map) => {
                this.resizeImage(map);
            }, (message) => {
                console.log("获取图片高度失败!-> " + message);
            });
        },

        /**
         * 真实的px转换为渲染的px
         * @param realpx
         * @return {number}
         */
        realPxConvertRenderPx(realpx) {
            return realpx / this.rpx;
        }
    }
}
