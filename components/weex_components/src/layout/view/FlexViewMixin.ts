import umengMixin from "../../mixins/umeng/UmengMixin";
import WeexThemeControl from "../../theme/WeexThemeControl";

export default {
    name: "flex-view",
    mixins: [umengMixin],
    props: {
        viewStyle: {
            default: ()=>({})
        }
    },
    data() {
        return {};
    },
    computed: {
        style() {
            const viewStyle = {
                ...this.viewStyle
            };

            return WeexThemeControl.resolveStyle({
                backgroundColor: "fill-body"
            }, viewStyle);
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