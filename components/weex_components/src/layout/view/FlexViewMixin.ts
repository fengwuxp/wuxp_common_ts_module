import umengMixin from "../../mixins/umeng/UmengMixin";
import WeexThemeControl from "../../theme/WeexThemeControl";

export default {
    name: "flex-view",
    mixins: [umengMixin],
    props: {
        viewStyle: {
            default: {}
        }
    },
    data() {
        return {};
    },
    computed: {
        style() {
            let view = {
                ...this.viewStyle
            };

            const backgroundColor = WeexThemeControl.getColorByName("fill-body");
            if (backgroundColor) {
                view.backgroundColor = backgroundColor;
            }
            return view;
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