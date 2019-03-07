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

    import Feather from "../../glyphmaps/Feather.json";
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

