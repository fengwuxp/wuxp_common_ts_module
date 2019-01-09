<template>
    <weex-icon :fontFamily="fontFamily"
               :glyphMap="glyphMap"
               :name="name"
               :color="color"
               :size="size"
               :classNames="classNames"
               :iconStyle="iconStyle"
               @iconClicked="iconClicked"
    ></weex-icon>
</template>

<script>

    import Feather from "../../src/feather/Feather.json";
    import iconMixin from "../iconMixin";

    export default {
        name: "ant-design-icon",
        mixins: [iconMixin],
        data() {
            return {
                fontFamily: "AntDesign",
                glyphMap: Feather
            }
        }
    }
</script>

