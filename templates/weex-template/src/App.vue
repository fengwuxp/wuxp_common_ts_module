<template>
    <div>
        <text>123</text>
        <text value="456" class="text_red" style="font-size: 22px;"></text>
        <!--<keep-alive>-->
        <!--<router-view style="flex:1" v-if="$route.meta.keepAlive"></router-view>-->
        <!--</keep-alive>-->
        <!--<router-view style="flex:1" v-if="!$route.meta.keepAlive"></router-view>-->
    </div>
</template>

<script>
    import {sayHello} from "./utils/Utils";

    export default {
        methods: {},
        created() {
            sayHello()
        }
    }
</script>
<style scoped lang="scss" src="./style.module.scss"/>
