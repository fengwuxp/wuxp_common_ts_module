import * as React from "react";
import {ReactView} from "../../../../spring-framework/spring-react/src/annotations/ReactViewMapping";


interface TemplateViewProps {

}

interface TemplateViewState {

}


@ReactView({
    pathname: "template",
    name: "模板页面",
    //是否可以可以进入该页面，如果没有权限则跳转到无权限的页面
    condition: (context) => {
        //通过 context 进行判断是否有进入该页面的权限
        //或者是 定义一组权限列表 ["member.add","member.edit"]
        return true;
    },
    exact: true
})
export default class TemplateView extends React.Component<TemplateViewProps, TemplateViewState> {


    constructor(props: TemplateViewProps, context: any) {
        super(props, context);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return undefined;
    }
}