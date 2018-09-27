<!--app base header -->
<template>
    <div>
        <div v-if="isIos"></div>
        <div class="app_header">
            <slot name="header-left"></slot>
            <slot name="header-center"></slot>
            <slot name="header-right"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "app-base-header",
        props: {},
        data() {

            return {
                isIos: false
            }
        }
    }
</script>

<style scoped>
    .app_header {
        flex-direction: row;
    }
</style>
