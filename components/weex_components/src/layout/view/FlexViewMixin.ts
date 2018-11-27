import umengMixin from "../../mixins/umeng/UmengMixin";
import CommonThemeControl from "common_style/src/CommonThemeControl";
import AppConfigRegistry from "common_config/src/app/AppConfigRegistry";

const layoutConfig = AppConfigRegistry.getLayoutConfig();

const defaultStyle = layoutConfig.style || {} as any;

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
        return {};
    },
    computed: {
        viewStyle() {
            const style = CommonThemeControl.resolveStyle({
                backgroundColor: "fill-body"
            }, defaultStyle);

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
    }
}