/**
 * Created by wuxp on 2017/6/25.
 */
import App from './App.vue';
// import router from './router/RouterIndex';
// import {fetch} from "./index";

// console.log(fetch);

// weex.supports = (name) => {
//     return true;
// };
weex.init(Vue);

App.el = '#root';
// App.router = router;

new Vue(App);
// router.push("/");


