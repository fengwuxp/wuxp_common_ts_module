<!--下拉刷新-->
<template>
    <drop-refresh-view :loadMore="loadMore"
                       :querySize="6">
        <div></div>
    </drop-refresh-view>
</template>

<script>
    import DropRefreshView from "../../src/layout/drop-refresh/drop-refresh-view";

    export default {
        name: "drop-refresh-view",
        components: {
            DropRefreshView
        },
        data() {
            return {}
        },
        methods: {
            loadMore() {

                return Promise((resolve) => {
                    resolve(5);
                });
            }
        }
    }
</script>

<style scoped>

</style>