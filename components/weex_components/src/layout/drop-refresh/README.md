
##### 下拉刷新视图 使用示例

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
                           loadMore({queryPage,querySize},isRefresh) {

                               return Promise((resolve) => {
                                   resolve();
                               });
                           }
                       }
                   }
               </script>

               <style scoped>

               </style>
               
               
#####  组件说明

- [DropRefreshProps](./props/DropRefreshProps.ts)    
```
  loadMore方法：加载列表数据的方法，传入2个参数，第一个是一个分页对象：{queryPage,querySize}，第二个是isRefresh，表示是否为刷新

``` 
          
- [CommonHandle](./minxins/CommonHandle.ts)   
           
```
``` 
