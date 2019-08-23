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

    import MaterialCommunityIcons from "../../glyphmaps/MaterialCommunityIcons.json";
    import iconMixin from "../iconMixin";

    export default {
        name: "MaterialCommunityIcons",
        mixins: [iconMixin],
        data() {
            return {
                fontFamily: "MaterialCommunityIcons",
                glyphMap: MaterialCommunityIcons
            }
        }
    }
</script>


