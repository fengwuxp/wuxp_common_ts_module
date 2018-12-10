export default {
    start: {
        component: resolve => require(["../views/FlashScreenView"], resolve)
    },
    index: {
        component: resolve => require(["../views/WebIndexView"], resolve)
    },
    test_view: {
        component: resolve => require(["../views/TestView"], resolve)
    },
};
