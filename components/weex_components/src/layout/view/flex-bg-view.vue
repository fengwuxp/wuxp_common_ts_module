<!--flex bg view-->
<template>
    <div class="flex-view"
         :style="viewStyle"
         @viewappear="viewAppear"
         @viewdisappear="viewDisappear">
        <image v-if="bgSrc"
               :src="bgSrc"
               :style="bgStyle"></image>
        <div class="bg_image">
            <image v-if="enableImmersiveBottomBar && immersiveStatusBarBgImage"
                   :src="immersiveStatusBarBgImage"
                   :style="immersiveStatusBarBgImageStyle"></image>
            <div v-if="enableImmersiveNavBar && immersiveStatusBarBgImage == null"
                 :style="immersiveStatusBarStyle"></div>
            <slot name="app-header"></slot>
            <slot name="app-body"></slot>
            <slot name="app-footer"></slot>
            <image v-if="enableImmersiveBottomBar && immersiveBottomBarBgImage"
                   :src="immersiveBottomBarBgImage"
                   :style="immersiveBottomBarStyle"></image>
            <div v-if="enableImmersiveBottomBar && immersiveBottomBarBgImage == null"
                 :style="immersiveBottomBarStyle"></div>
        </div>

    </div>
</template>

<script>

    import CommonHandle from "./mixins";

    export default {
        name: "flex-bg-view",
        mixins: [CommonHandle],
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
