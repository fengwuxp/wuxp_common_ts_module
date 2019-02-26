<!-- 选择列表 -->
<template>
    <wxc-popup popup-color="rgba(255,255,255,0)"
               ref="popup"
               :show="showPopup"
               @wxcPopupOverlayClicked="popupOverlayBottomClick"
               pos="bottom"
               :height="popupHeight">
        <div class="">
            <div class="header border_bottom">
                <text class="text_title" :value="title"></text>
            </div>
            <scroller show-scrollbar="false"
                      class="item_scroller">
                <text v-for="(item,i) in items"
                      class="text_item border_bottom"
                      :key="i"
                      @click="onClickItem(i)"
                      :value="item"></text>
            </scroller>
            <div class="footer" @click="toggle">
                <text class="text_cancel" :value="cancelText"></text>
            </div>
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
            title: {
                default: "请选择"
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
                this.onClickItem(index);
            },
            pushAction(item) {
                this.items.push(item);
            }
        }
    }
</script>
<style lang="less" scoped>

    .header {
        padding: 25px;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
    }

    .text_title {
        font-size: 32px;
        color: #303030;
    }

    .item_scroller {
        background-color: #ffffff;
        flex: 1;
        justify-content: center;
    }

    .text_item {
        height: 80px;
        line-height: 80px;
        font-size: 32px;
        color: #303030;
        text-align: center;
    }

    .border_bottom {
        border-width: 1px;
        border-color: #e6e6e6;
    }

    .footer {
        margin-top: 20px;
        padding: 25px;
    }

    .text_cancel {
        font-size: 32px;
        color: #303030;
    }

</style>
