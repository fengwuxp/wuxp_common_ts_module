import {asyncComponent} from "typescript-spring-react/src/route/AsyncComponent";
import {SpringReactRouteConfig} from "typescript-spring-react/src/route/SpringReactRouteConfig";

/**
 * 自动生成的路由配置列表
 **/
const routes: Array<SpringReactRouteConfig> = [

   

      {
        name : "测试页面1",
        pathname : "/test",
        exact : true,
        component : asyncComponent( ()=> import("../../test/TestView"))
      },

   

      {
        name : "首页",
        pathname : "/home",
        exact : true,
        component : asyncComponent( ()=> import("../../home/HomeView"))
      },

   
]
