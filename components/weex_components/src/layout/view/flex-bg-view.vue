<!--flex bg view-->
<template>
    <div class="app"
         :style="viewStyle"
         @viewappear="viewAppear"
         @viewdisappear="viewDisappear">
        <image :src="bgSrc" :style="bgStyle"></image>
        <div class="bg_image">
            <slot name="app-header"></slot>
            <slot name="app-body"></slot>
            <slot name="app-footer"></slot>
        </div>

    </div>
</template>

<script>

    import FlexViewMixin from "./FlexViewMixin";

    export default {
        mixins: [FlexViewMixin],
        props: {
            bgSrc: {
                default: null
            },
            bgStyle: {
                default: {
                    flex: 1
                }
            }
        }
    };
</script>

<style scoped lang="less">

    @import "./styles";

    .bg_image {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        flex-direction: column;
    }

</style>
