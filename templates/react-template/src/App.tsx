import ReactDOM from "react-dom";
import React from "react";
import IndexView from "./views/IndexView";
import {renderRoutes} from "common_react_router/src/RenderRoutes";
import routes from "./views";
import {Router} from "react-router";
import {createBrowserHistory} from "history";

//创建history
const history = createBrowserHistory();
// const App = () => <IndexView/>;
const App = () => <div>
    <Router history={history}>
        {renderRoutes(routes, {
            authorization: (p1) => {
                return undefined;
            }, isAuthenticated: () => {
                return false;
            }

        })}
    </Router>
</div>;


ReactDOM.render(<App/>, document.getElementById("app"));