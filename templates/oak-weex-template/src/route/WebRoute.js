export default {
    start: {
        component: resolve => require(["../views/FlashScreenView"], resolve)
    },
    index: {
        component: resolve => require(["../views/WebIndexView"], resolve)
    },
    login: {
        component: resolve => require(["../views/account/LoginView"], resolve)
    },
    test_view: {
        component: resolve => require(["../views/TestView"], resolve)
    },
};
