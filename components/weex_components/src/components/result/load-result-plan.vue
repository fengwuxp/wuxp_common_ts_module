<!--加载结果页面-->
<template>
    <div v-if="queryEnd"
         class="no_data">
        <image v-if="noDataIcon && resultSize===0" :src="noDataIcon" :style="iconStyle"></image>
        <text v-if="resultSize>0" :style="textStyle">{{noMoreText}}</text>
        <text v-if="resultSize===0" :style="textStyle">{{noDataText}}</text>
    </div>
</template>
<script>
    export default {
        props: {
            queryEnd: {
                default: false
            },
            resultSize: {default: 0},
            noMoreText: {default: "没有更多数据了"},
            noDataText: {default: "暂无数据"},
            noDataIcon: {default: ""},
            textStyle: {
                default: {
                    fontSize: "30px",
                    color: "#999999",
                    marginTop: 70,
                    marginBottom: "25px"
                }
            },
            iconStyle: {
                default: {
                    width: "200px",
                    height: "200px",
                    marginTop: "50px"
                }
            }
        },
        data() {
            return {

            }
        },
    }
</script>
<style scoped>
    .no_data {
        justify-content: center;
        align-items: center;
    }
</style>
