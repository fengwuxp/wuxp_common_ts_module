import App from "./App.vue";
import router from "weex_starter/src/route/WebRouterHolder";
import {WeexWebNavigatorModule} from "common_weex/src/route/WeexWebNavigatorModule";
import {registerWeexModuleByWeb} from "oak_weex_starter/src/RegisterWeexModuleByWeb";

/**
 * App入口
 */

//注册weex模块
registerWeexModuleByWeb();

//初始化Vue
weex.init(Vue);

weex.registerModule("navigator", new WeexWebNavigatorModule(router));


console.log("--->", router);

App.el = '#root';
// const vue = new Vue(Vue.util.extend({el: '#root', router}, App));
const vue = new Vue({
    el: '#app',
    router,
    render: h => h(App)
});

// router.push("/test_view");