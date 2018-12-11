import {AppRoute} from "weex_starter/src/route/AppRouter";

const webRoutes: AppRoute = {

    index: {
        component: "WebIndexView.js",
        meta: {
            main: true
        }
    },
    login: {
        component: "account/Login.js"
    },
    test_view: {
        component: "TestView.js"
    },
    member: {
        component: "member/MemberIndexView.js"
    }
};

export default webRoutes;