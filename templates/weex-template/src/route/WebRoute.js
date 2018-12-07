export default {

    index: {
        component: resolve => require(["../views/WebIndexView"], resolve)
    },
    test: {
        component: resolve => require(["../views/TestView"], resolve)
    },
};
