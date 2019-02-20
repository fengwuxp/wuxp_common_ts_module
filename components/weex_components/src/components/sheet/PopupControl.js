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
        cancelText: {
            default: "取消"
        },
        orderIndex: {
            default: 0
        }
    },
    data() {
        return {
            showPopup: false,
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
            this.showPopup = false;
            this.$emit("onClose", this.orderIndex);
        },
        openPopup(showPopup) {
            if (showPopup) {
                this.showPopup = showPopup;
            } else {
                this.$refs["popup"].appearPopup(false);
            }
        },
        toggle() {
            this.openPopup(!this.showPopup);
        },

        onClickItem(index){
            this.$emit("onChoose", {
                index,
                item: this.items[index]
            });
            this.openPopup(false);
        }

    }
}