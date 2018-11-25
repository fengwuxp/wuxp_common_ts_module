import App from './App.vue';

/**
 * 入口
 */

weex.init(Vue);

App.el = '#root';

new Vue(App);


