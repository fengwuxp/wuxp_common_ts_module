<template>
    <weex-icon :fontFamily="fontFamily"
               :glyphMap="glyphMap"
               :name="name"
               :color="color"
               :size="size"
               :iconStyle="iconStyle"
               @onClick="iconClicked"
    ></weex-icon>
</template>

<script>

    import AntDesign from "../../glyphmaps/AntDesign.json";
    import iconMixin from "../iconMixin";

    export default {
        name: "ant-design-icon",
        mixins: [iconMixin],
        data() {
            return {
                fontFamily: "AntDesign",
                glyphMap: AntDesign
            }
        }
    }
</script>

