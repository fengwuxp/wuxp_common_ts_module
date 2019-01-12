<!--tab listView 基于slider实现-->
<template>
    <div class="list-view flex_1">
        <div :style="headerStyle">
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
        </div>
        <slider :infinite="false"
                :index="selectedIndex"
                @change="changeSlider"
                class="flex_1">
            <div v-for="(item,i) in tabTitles"
                 :key="i"
                 class="view_content">
                <slot v-if="showStatus[i]" :name="'tab_item_'+i"></slot>
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
                selectedIndex: isWeb ? parseInt(this.defaultIndex) || 0 : 0,
                showStatus: this.tabTitles.map(() => false)
            };
        },
        computed: {
            headerStyle() {
                return {
                    width: 750,
                    height: this.tabStyles.height
                }
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
                Vue.set(this.showStatus, index, true);
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

    .flex_1 {
        flex: 1;
    }

    .list-view {
        position: relative;
        height: 100%;
        flex-direction: column;
    }

    .view_content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>
