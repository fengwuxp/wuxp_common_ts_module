import * as ReactDOM from "react-dom";
import React from "react";
import {createBrowserHistory} from "history";
import routes from "./reactdemo/index";
import {Route, Router, Switch} from "react-router";
import {renderRoutes} from "react-router-config";
import {BrowserRouter} from "react-router-dom";
import {history} from "./reactdemo/AppRouterHelper"
import "./promise/PromiseDemo";
// import {runSandboxEvnTest} from "./scanbox/SandboxRunGlobalObject";
import ModalGalleryExample from "./dialog_route";

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


interface PageHeader {

    getPagHeader?: () => string;
}

const Demo = (props) => {

    const element: React.ReactNode & PageHeader = <div>
        <Router history={history}>
            <Switch> {renderRoutes(routes)}</Switch>
        </Router>
    </div>;

    // element.getPagHeader = () => {
    //
    //     return "test";
    // };

    return element
};

Demo.getPagHeader = () => {
    return "test";
}


const App = (props) => {

    let demo: React.ReactNode & PageHeader = <Demo/>;
    console.log("demo", demo);
    return <div>
        {/*{demo.getPagHeader()}*/}
        {demo}
    </div>
};


ReactDOM.render(<ModalGalleryExample/>,
    document.getElementById("app"));
