import umengMixin from "../../../mixins/umeng/UmengMixin";
import CommonThemeControl from "common_style/src/CommonThemeControl";
import {weexSimpleBootStarter} from "../../../boot/WeexViewBootstrap";

/**
 * 由于weex是多页应用，所以在根页面入口要做 bootStartUp
 */
export default {

    mixins: [umengMixin],
    props: {
        flexViewStyle: {
            default: () => ({}),
            type: Object
        }
    },
    data() {
        return {
            defaultStyle: null,
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
        }
    },
    methods: {

        viewAppear() {
            this.reportUMengByIntoPage();
            this.$emit("viewAppear");

        },
        viewDisappear() {
            this.$emit("viewDisappear");
            this.reportUMengByDestroy();
        },

        fadeInView(opacity) {
            if (opacity === 1) {
                return;
            }
            opacity += 0.15;
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
        weexSimpleBootStarter.startup().then(({appRouter, appConfig, appRegistry}) => {
            const layoutConfig = appRegistry.getLayoutConfig();
            this.defaultStyle = {
                ...(layoutConfig.style || {}),
                opacity: 0
            }
        });


    }
}