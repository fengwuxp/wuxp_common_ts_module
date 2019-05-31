import ReactDOM from "react-dom";
import React from "react";
import {history} from "./AppRouterHelper";
import {renderRoutes} from "common_react_router/src/RenderRoutes";
import routes from "./views";
import {Router} from "react-router";

//创建history

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