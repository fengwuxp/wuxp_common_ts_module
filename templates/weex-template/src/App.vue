<!--webd端 应用入口-->
<template>
    <div @androidback="back">
        <!--<keep-alive>-->
            <!--<router-view style="flex:1" v-if="$route.meta.keepAlive"></router-view>-->
        <!--</keep-alive>-->
        <!--<router-view style="flex:1" v-if="!$route.meta.keepAlive"></router-view>-->
        <router-view style="flex:1"></router-view>
    </div>
</template>

<script>
    export default {
        methods: {
            back: function () {
                this.$router.back()
            }
        },
        beforeMount() {
            console.log(this)
        }
    }
</script>
