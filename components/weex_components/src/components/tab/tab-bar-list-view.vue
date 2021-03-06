<!--带有可滚动，且能固定顶部的tabbar list-->
<template>
    <drop-refresh-list-view class="list-view flex_1"
                            @onRefresh="onRefresh"
                            @onPullingDown="onPullingDown">
        <slot></slot>
        <header :style="headerStyle" v-if="innerUseTabBar">
            <tab-scroll-header :tabTitles="tabTitles"
                               :tabStyles="tabStyles"
                               :titleType="titleType"
                               :titleUseSlot="titleUseSlot"
                               :defaultIndex="selectedIndex"
                               :startScrollIndex="startScrollIndex"
                               ref="tab-scroll-header"
                               @onChangeTab="changeSlider">
                <slot v-if="titleUseSlot"
                      v-for="(item,index) in tabTitles"
                      :name="`tab_title_${index}`"
                      :slot="`tab-title-${index}`"></slot>
            </tab-scroll-header>
        </header>
        <cell :style="slideStyle">
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
        </cell>
        <slot name="view-footer"></slot>
    </drop-refresh-list-view>
</template>
<script>
    import DropRefreshListView from "../../layout/drop-refresh/drop-refresh-list-view";
    import TabScrollHeader from "./tab-scroll-header";

    import props from "./TabHeaderProps";
    import {isWeb} from "fengwuxp_common_weex/src/constant/WeexEnv";


    export default {
        components: {
            DropRefreshListView,
            TabScrollHeader
        },
        mixins: [],
        props: {
            ...props,
            tabContentHeight: {
                default: 0
            },
            useTabBar: {
                default: true
            }
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
                    width: "750px",
                    height: `${this.tabStyles.height}px`
                }
            },
            slideStyle() {
                return {
                    width: "750px",
                    height: `${this.tabContentHeight}px`
                }
            },
            innerUseTabBar() {
                const {tabTitles, useTabBar} = this;

                return useTabBar && tabTitles.length > 0;
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
                if (index === this.selectedIndex) {
                    return;
                }
                this.emitEvent(index);
                this.selectedIndex = index;
                this.$refs['tab-scroll-header'].changeIndex(index);
            },
            emitEvent(index) {
                this.$emit("onChangeTab", {index});
            },
            onPullingDown(e) {
                this.$emit("onPullingDown", e);
            },
            onRefresh() {
                //向父组件广播刷新事件
                this.$emit("onRefresh");
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
