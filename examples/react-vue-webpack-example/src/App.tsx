import * as ReactDOM from "react-dom";
import React from "react";
import {createBrowserHistory} from "history";
import routes from "./reactdemo/index";
import {Route, Router, Switch} from "react-router";
import {renderRoutes} from "react-router-config";
import {BrowserRouter} from "react-router-dom";
import {history} from "./reactdemo/AppRouterHelper"
// import {runSandboxEvnTest} from "./scanbox/SandboxRunGlobalObject";

// runSandboxEvnTest()

import('./scanbox/SandboxRunGlobalObject').then(function ({runSandboxEvnTest}) {
    // 渲染页面
    runSandboxEvnTest()
});

// const App =  <div>
//     <BrowserRouter>
//         <Switch> {renderRoutes(routes)}</Switch>
//     </BrowserRouter>
// </div>;

const App = <div>
    <Router history={history}>
        <Switch> {renderRoutes(routes)}</Switch>
    </Router>
</div>;

ReactDOM.render(App,
    document.getElementById("app"));
