
##### 下拉刷新视图


               <!--下拉刷新-->
               <template>
                   <drop-refresh-view :loadMore="loadMore">
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
                                   resolve();
                               });
                           }
                       }
                   }
               </script>

               <style scoped>

               </style>