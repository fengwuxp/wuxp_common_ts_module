<template>
    <div>
        <text>123</text>
        <text value="456" class="text_red" style="font-size: 22px;"></text>
    </div>
</template>

<script>
    export default {
        methods: {}
    }
</script>
<style scoped lang="less">

    @import "../less/theme";

    .text_red {
        color: @primary-color;
    }
</style>
