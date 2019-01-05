<!--tab listView 基于slider实现-->
<template>
    <div class="list-view">
        <tab-scroll-header :tabTitles="tabTitles"
                           :tabStyles="tabStyles"
                           :titleType="titleType"
                           :titleUseSlot="titleUseSlot"
                           :defaultIndex="selectedIndex"
                           :startScrollIndex="startScrollIndex"
                           ref="tab-scroll-header"
                           @changeTab="changeSlider">
            <slot v-if="titleUseSlot"
                  v-for="(item,index) in tabTitles"
                  :name="`tab_title_${index}`"
                  :slot="`tab-title-${index}`"></slot>
        </tab-scroll-header>
        <slider :infinite="false"
                :index="selectedIndex"
                @change="changeSlider"
                :style="sliderStyle"
                class="view_wrapper view_content">
            <div v-for="(item,i) in tabTitles"
                 :key="i"
                 class="view_content">
                <slot :name="'tab_item_'+i"></slot>
            </div>
        </slider>
    </div>
</template>
<script>
    import TabScrollHeader from "./tab-scroll-header";
    import props from "./TabHeaderProps";
    import {isWeb} from "common_weex/src/constant/WeexEnv";

    export default {
        components: {TabScrollHeader},
        mixins: [],
        props: {
            ...props,
        },
        data() {
            return {
                selectedIndex: isWeb ? parseInt(this.defaultIndex) || 0 : 0
            };
        },
        computed: {
            sliderStyle() {
                return {
                    top: this.tabStyles.height+"px"
                };
            }
        },
        mounted() {
            this.$nextTick(() => {
                const index = parseInt(this.defaultIndex);
                this.changeSlider({index});
                if (index === 0) {
                    this.emitEvent(index);
                }
            });
        },
        methods: {

            /**
             * 改变slider
             * @param index
             */
            changeSlider({index}) {
                if (index !== this.selectedIndex) {
                    this.emitEvent(index);
                }
                this.selectedIndex = index;
                this.$refs['tab-scroll-header'].changeIndex(index);
            },
            emitEvent(index) {
                this.$emit("changeTab", {index});
            }
        },
        beforeMount() {
        }

    }
</script>
<style scoped>
    .list-view {
        flex: 1;
        height: 100%;
        position: relative;
    }


    .view_wrapper {
        justify-content: flex-end;
        position: relative;
        flex: 1;
    }

    .view_content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>
