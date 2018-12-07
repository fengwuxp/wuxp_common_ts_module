import App from "./App.vue";
import router from "weex_starter/src/route/WebRouterHolder";

/**
 * 入口
 */

weex.init(Vue);

App.el = '#root';
// const vue = new Vue(Vue.util.extend({el: '#root', router}, App));
const vue = new Vue({
    el: '#app',
    router,
    render: h => h(App)
});

console.log("--->", vue);