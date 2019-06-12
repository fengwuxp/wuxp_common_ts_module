import * as React from "react";
import * as ReactDOM from "react-dom";
import {BasicLayout} from "@ant-design/pro-layout";
import {Button} from "antd";


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
    <BasicLayout>
        <div>1</div>
        <Button type="primary">测试</Button>
    </BasicLayout>,
    document.getElementById("app")
);

