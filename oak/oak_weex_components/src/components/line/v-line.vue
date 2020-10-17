<!--竖线-->
<template>
    <div :style="style"></div>
</template>

<script>
    export default {
        name: "v-line",
        props: {
            height: {default: -1},
            backgroundColor: {default: "#e6e6e6"}
        },
        data() {
            return {
                style: {
                    width:1,
                    height: this.height,
                    backgroundColor: this.backgroundColor
                }
            }
        }
    }
</script>

<style scoped>

</style>