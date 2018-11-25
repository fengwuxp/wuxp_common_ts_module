import {reportUMengByDestroy, reportUMengByIntoPage} from "../../utils/umeng/UmengReportUtil";

const getCurrentPageSign = (headerTitle) => {
    const bundleUrl = weex.config.bundleUrl;
    const basePath = "";
    const uri = bundleUrl.replace(basePath, "").split("?")[0];
    if (headerTitle == null) {
        return uri
    }
    return uri + " " + headerTitle;
};

export default {

    methods: {

        /**
         * 友盟页面进入上报
         */
        reportUMengByIntoPage() {
            reportUMengByIntoPage(getCurrentPageSign(this.headerTitle));
            this.$emit("onResume");
        },

        /**
         * 友盟页面离开上报
         */
        reportUMengByDestroy() {
            reportUMengByDestroy(getCurrentPageSign(this.headerTitle));
            this.$emit("onPause");
        }
    }
}
