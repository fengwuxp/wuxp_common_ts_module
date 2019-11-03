// import Vue from 'vue'
import Vue from 'vue/dist/vue.esm.js'
import Router from 'vue-router'
import App from './vue/App'

const router = new Router({
    mode: 'history',
    routes: []
});

// https://blog.csdn.net/wxl1555/article/details/83187647

//runtime
// new Vue({
//     router,
//     render: h => h(App)
// }).$mount("#app");

// compiler
new Vue({
    el: '#app',
    router: router,
    template: '<App/>',
    components: { App }
});
