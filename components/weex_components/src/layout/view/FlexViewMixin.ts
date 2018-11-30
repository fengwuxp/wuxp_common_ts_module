import umengMixin from "../../mixins/umeng/UmengMixin";
import CommonThemeControl from "common_style/src/CommonThemeControl";

//获取bootStarter
const weexSimpleBootStarter = require("weex_starter/src/bootstartup/WeexSimpleBootStarter").default;

/**
 * 由于weex是多页应用，所有在 跟页面入口要做 bootStartUp
 */
export default {
    name: "flex-view",
    mixins: [umengMixin],
    props: {
        viewStyle: {
            default: () => ({}),
            type: Object
        }
    },
    data() {
        return {
            defaultStyle: null
        };
    },
    computed: {
        viewStyle() {
            const style = CommonThemeControl.resolveStyle({
                backgroundColor: "fill-body"
            }, this.defaultStyle);

            return {
                ...style,
                ...this.viewStyle
            };
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
        }
    },
    beforeMount() {

        //初始化应用的的数据
        weexSimpleBootStarter.statrup().then(({router, appConfig, appRegistry}) => {
            const layoutConfig = appRegistry.getLayoutConfig();

            this.defaultStyle = layoutConfig.style || {} as any;
        });


    }
}