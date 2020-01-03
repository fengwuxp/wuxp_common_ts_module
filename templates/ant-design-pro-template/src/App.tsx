import * as React from "react";
import * as ReactDOM from "react-dom";
import {routes} from "../.spring/ReactRouteConfig";
import {renderRoutes} from "fengwuxp-spring-react/src/route/RenderRoutes";


/*
*
*       SpringReactApplication.builder().configs(...configs).context().render(
*
*           ()=><>
*             <Jsx></Jsx>
*           </>
*
*       ).build()
*        .run()
*
*
*
*
* */

const App = (props) => {

    return <div>
        {renderRoutes(routes,null,null,props)}
    </div>
};

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);

