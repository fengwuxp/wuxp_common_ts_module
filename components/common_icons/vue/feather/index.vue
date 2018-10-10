<template>
    <!--<base-icon :fontFamily="fontFamily"-->
               <!--:glyphMap="glyphMap"-->
               <!--:name="name"-->
               <!--:color="color"-->
               <!--:classNames="classNames"-->
               <!--:style="style"-->
    <!--&gt;</base-icon>-->
</template>

<script>

    import Feather from "../../src/feather/Feather.json";
    import iconMixin from "../iconMixin";

    export default {
        name: "feather-icon",
        mixins: [iconMixin],
        data() {
            return {
                fontFamily: "Feather",
                glyphMap: Feather
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../src/feather/style.less";
</style>
