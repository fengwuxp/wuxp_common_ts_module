<!-- 操作列表 -->
<template>
    <wxc-popup popup-color="rgba(255,255,255,0)"
               ref="popup"
               :show="showCustomPlan"
               @wxcPopupOverlayClicked="popupOverlayBottomClick"
               pos="bottom"
               :height="popupHeight">
        <div class="action_sheet">
            <div class="action_items">
                <div v-for="(item,i) in items"
                     :class="getClassNames(i)"
                     @click="clickAction(i)"
                     :key="i">
                    <text class="item_text"
                          :value="item"></text>
                </div>
            </div>
            <text @click="openPopup(false)"
                  class="text_cancel"
                  value="取消"></text>
        </div>
    </wxc-popup>
</template>

<script>

    import PopupControl from "./PopupControl";

    export default {
        name: "action-sheet",
        props: {
            itemHeight: {
                default: 100
            }
        },
        mixins: [PopupControl],
        data() {
            return {};
        },
        methods: {
            getClassNames(i) {
                let classNames = ["action_item"];
                if (i < this.items.length - 1) {
                    classNames.push("border_bottom");
                }
                return classNames;
            },
            clickAction(index) {
                this.$emit("onActionSheetChoose", {
                    index,
                    item: this.items[index]
                });
                this.openPopup(false);
            },

            pushAction(item) {
                this.items.push(item);
                this.popupHeight = this.getPopupHeight();
            }
        }
    }
</script>
<style lang="less" scoped>

    .action_sheet {
        flex: 1;
        padding: 20px;
        justify-content: center;
    }

    .text_cancel {
        font-size: 32px;
        color: #0e8dec;
        text-align: center;
        border-radius: 15px;
        margin-bottom: 20px;
        margin-top: 20px;
        background-color: #ffffff;
        padding: 25px;
    }

    .action_items {
        border-radius: 15px;
        background-color: #ffffff;
        overflow: hidden;
    }

    .item_text {
        font-size: 32px;
        color: #303030;
    }

    .action_item {
        justify-content: center;
        align-items: center;
        padding: 25px;
    }

    .border_bottom {
        border-width: 1px;
        border-color: #e6e6e6;
    }

</style>
