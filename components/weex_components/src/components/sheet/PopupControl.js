import WxcPopup from "../popup/index";

/**
 * 弹出式控制
 */
export default {
    components: {
        WxcPopup
    },
    props: {
        /**
         * 操作项列表，建议不要超过5个
         */
        items: {default: []},

        /**
         *显示个数
         */
        displayNumber: {
            default: 5
        },
        orderIndex: {
            default: 0
        }
    },
    data() {
        return {
            showCustomPlan: false,
        }
    },
    computed: {
        popupHeight() {
            let length = this.items.length;
            length = (length > this.displayNumber ? this.displayNumber : length) + 1;
            return 50 + length * this.itemHeight + length - 1;
        }
    },
    methods: {
        popupOverlayBottomClick() {
            this.showCustomPlan = false;
            this.$emit("onClose", this.orderIndex);
        },
        openPopup(showCustomPlan) {
            if (showCustomPlan) {
                this.showCustomPlan = showCustomPlan;
            } else {
                this.$refs["popup"].appearPopup(false);
            }
        },
        toggle() {
            this.openPopup(!this.showCustomPlan);
        },


    }
}