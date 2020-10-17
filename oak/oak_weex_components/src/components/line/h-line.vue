<!--横线-->
<template>
    <div :style="style"></div>
</template>

<script>
    export default {
        name: "h-line",
        props: {
            width: {default: -1},
            backgroundColor: {default: "#e6e6e6"}
        },
        data() {
            return {
                style: {
                    height: 1,
                    width: this.width,
                    backgroundColor: this.backgroundColor
                }
            }
        }
    }
</script>

<style scoped>

</style>