export default {

    index: {
        component: resolve => require(["../views/WebIndexView"], resolve)
    },
    test_view: {
        component: resolve => require(["../views/TestView"], resolve)
    },
};
