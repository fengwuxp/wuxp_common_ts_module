import {createBrowserHistory, createHashHistory} from "history";

const history = createBrowserHistory({
    basename: "/react"
});
// const history = createHashHistory({
//     basename: "/react"
// });

export {
    history
};
