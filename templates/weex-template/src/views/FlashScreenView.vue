<template>
    <flex-view :flexViewStyle="viewStyle"
               class="view">
        <div class="flex_cell" slot="app-body">
            <image v-if="images.length>0" resize="cover"
                   class="slider_container"
                   :src="images[0].src"
            ></image>
            <text class="jump_button" @click="toIndex" :value="jumpText"></text>
        </div>
    </flex-view>
</template>
<script>
    import FlexView from "weex_components/src/layout/view/flex-view";
    import AppMixin from "weex_starter/src/mixins/AppMixin";
    import {isWeb} from "common_weex/src/constant/WeexEnv";

    export default {
        props: {
            flexViewStyle: {
                default: () => ({
                    //transparent
                    backgroundColor: "transparent"
                })
            },
        },
        components: {
            FlexView
        },

        mixins: [AppMixin],

        data() {
            return {
                images: [],
                maxCount: 3
            }
        },
        computed: {

            jumpText() {
                return `${this.maxCount}秒后跳过`;
            }
        },
        methods: {
            countDown() {
                setTimeout(() => {
                    if (this.maxCount === 1) {
                        this.toIndex();
                    }
                    this.maxCount--;
                    this.countDown();
                }, 1000);
            },
            toIndex() {
                this.toView("/index").then(() => {
                    if (isWeb) {
                        this.back();
                    }
                });
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.countDown();
            });
        },
        beforeMount() {

        },
        created() {


        }

    }
</script>
<style>
    .flex_cell {
        flex: 1;
    }

    .view {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: transparent;
    }

    .slider_container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: transparent;
    }

    .jump_button {
        width: 180px;
        font-size: 32px;
        line-height: 80px;
        position: fixed;
        text-align: center;
        top: 50px;
        right: 40px;
        color: #ffffff;
        background-color: rgba(0, 0, 0, .2);
        border-radius: 55px;
    }
</style>
