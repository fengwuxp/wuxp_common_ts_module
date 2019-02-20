<!-- 选择列表 -->
<template>
    <wxc-popup popup-color="rgba(255,255,255,0)"
               ref="popup"
               :show="showCustomPlan"
               @wxcPopupOverlayClicked="popupOverlayBottomClick"
               pos="bottom"
               :height="popupHeight">
        <div class="">
            <div class="padding_20 border_bottom bg_white flex_center">
                <text class="text_default" value="请选择"></text>
            </div>
            <scroller class="bg_white flex_cell flex_h_center">
                <wxc-radio :list="items"
                           ref="wxc-radio"
                           :config="config"
                           @wxcRadioListChecked="wxcRadioListChecked"></wxc-radio>
            </scroller>
        </div>
    </wxc-popup>
</template>

<script>
    import PopupControl from "./PopupControl";

    export default {
        name: "action-sheet",
        props: {
            itemHeight: {
                default: 80
            },
            config: {
                default: null
            }

        },
        mixins: [PopupControl],
        data() {
            return {};
        },
        methods: {
            wxcRadioListChecked({value, index}) {
                this.$emit("onActionSheetChoose", this.items[index]);
                this.toggle();
            },

            pushAction(item) {
                this.items.push(item);
            }
        }
    }
</script>
<style lang="less" scoped>


</style>
