import TestView from "../views/TestView";

export default{

    index: {
        component: resolve => require(["../views/test/TestView"], resolve)
    },
    test_view: {
        component: TestView
    }
};
