<template>
    <weex-icon :fontFamily="fontFamily"
               :glyphMap="glyphMap"
               :name="name"
               :color="color"
               :size="size"
               :iconStyle="iconStyle"
               @iconClicked="iconClicked"
    ></weex-icon>
</template>

<script>

    import Ionicons from "../../glyphmaps/Ionicons.json";
    import iconMixin from "../iconMixin";

    export default {
        name: "ionicon-icon",
        mixins: [iconMixin],
        data() {
            return {
                fontFamily: "Ionicons",
                glyphMap: Ionicons
            }
        }
    }
</script>


