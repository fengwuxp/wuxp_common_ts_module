import * as React from "react";
import * as ReactDOM from "react-dom";
import {Example} from "./components/Example";



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

ReactDOM.render(
    <Example/>,
    document.getElementById("app")
);

