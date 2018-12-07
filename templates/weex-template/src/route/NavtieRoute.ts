import {AppRoute} from "weex_starter/src/route/AppRouter";

const webRoutes: AppRoute = {

    index: {
        component: "WebIndexView.js",
        meta:{
            main:true
        }
    },
    test_view: {
        component: "TestView.js"
    }
};

export default webRoutes;