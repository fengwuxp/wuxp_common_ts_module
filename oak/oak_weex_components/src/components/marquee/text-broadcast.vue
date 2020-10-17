<template>
    <div class="broadcast-container" :style="marqueeStyle">
        <div class="broadcast-left flex_v_center">
            <image :src="hornIconURL" class="horn-icon"></image>
        </div>
        <div ref="anim" class="anim"
             :style="{height:step*count}">
            <div v-for="(item,i) in items"
                 :style="broadcastItemStyle"
                 @click="clickHandle(item)"
                 class="marquee_item">
                <!--<text class="text-overflow  text-title" lines="1">{{item.name}}</text>-->
                <text class="text-overflow text-info" lines="1">{{item.description}}</text>
            </div>
        </div>
    </div>
</template>
<script>

    import {animation} from "typescript_api_sdk/src/utils/ExportWeexSdkModel";
    import weexUtils from "wxp_weex_components/src/utils/WeexUtils";
    import viewDataAnalysis from "../../analysis/ViewDataAnalysis";
    // import marquee from "./marquee";

    export default {
        components: {
            // marquee
        },
        mixins: [viewDataAnalysis],
        props: {
            hornIconURL: {default: weexUtils.getResourcesURL("images/horn_icon.png")},
            /**
             * 滚动动画时长
             **/
            duration: {default: 500},
            /**
             * 滚动间隔
             **/
            interval: {default: 3000},
            /**
             * 步长（高度）
             **/
            step: {default: 50},
            /**
             * 初始位置
             **/
            index: {default: 1}
        },
        data() {
            return {
                count: 0,
                marqueeStyle: {},
                broadcastItemStyle: {
                    height: this.step + "px",
                    alignItems: "flex-start"
                }
            }
        },
        computed: {
            textItems() {
                return this.items.map((item) => item.name);
            }
        },
        methods: {
            /**
             * nextTick
             **/
            nextTick: function () {
                this.animation(() => {
                    this.nextTick()
                });
            },
            /**
             * 滚动动画
             * @param callback
             */
            animation: function (callback = () => {
            }) {
                let offset = -this.step * this.index;
                let anim = this.$refs['anim'];
                animation.transition(anim, {
                    styles: {
                        transform: 'translateY(' + offset + 'px)'
                    },
                    timingFunction: 'ease',
                    duration: this.duration,
                    delay: this.interval
                }, () => {
                    this.index = (this.index + 1) % (this.count);
                    this.$emit('change', {
                        index: this.index,
                        count: this.count
                    });
                    callback();
                });
            },
            updateStyle() {
            }
        },
        mounted() {
            if (this.items.length === 1) {
                return;
            }
            this.$nextTick(() => {
                this.nextTick();
            });
        },
        beforeMount() {
            const {margin} = this.uiFloor;
            let marqueeStyle = {
                height: this.step,
                width: this.renderWidth
            };
            if (margin !== null && margin.trim().length > 0) {
                //margin处理
                const marginAttrs = ["marginTop", "marginRight", "marginBottom", "marginLeft"];
                const s = margin.split(" ");
                s.forEach((val, i) => {
                    if (val.trim().length === 0) {
                        return;
                    }
                    marqueeStyle[marginAttrs[i]] = val.indexOf("px") >= 0 ? val : val + "px";
                });
            }
            this.marqueeStyle = marqueeStyle;

            this.count = this.items.length;
        }
    }
</script>
<style scoped lang="sass">
    @import "text-broadcast.scss";
</style>
<style scoped>
    .marquee_item {
        padding-top: 7px;
        padding-bottom: 7px;
    }
</style>
