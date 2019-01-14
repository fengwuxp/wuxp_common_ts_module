<!--水平线-->
<template>
    <div class="line" :style="lineStyle"></div>
</template>

<script>
    export default {
        name: "h_line",
        props:{
            width:{
                default:750
            }
        },
        computed:{
            lineStyle(){
                return {
                    width:`${this.width}px`
                }
            }
        }
    }
</script>

<style scoped lang="less">

    @import "../../theme/defualt_theme";

    .line{
        background-color: @border-color-base;
        height: 1px;
    }
</style>