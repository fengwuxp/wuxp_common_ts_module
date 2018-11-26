import App from "./App.vue";
import router from "weex_starter/src/route/WebRouterHolder";

/**
 * 入口
 */

weex.init(Vue);

App.el = '#root';

new Vue(Vue.util.extend({el: '#root', router}, App));

