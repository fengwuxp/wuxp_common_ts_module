import * as React from "react";
import FlexView from "../components/FlexView";
import Header from "../components/Header";
import {ReactRouteView} from "fengwuxp_common_state/src/annotations/ReactRouteView";
import HomeDataProvider from "../provider/HomeDataProvider";
import { useState } from "react";



export interface HomeViewProps {

    name: string;

    total: number;

    simpleObject: object
}

interface HomeViewState {
}

function Example() {
    // 声明一个新的叫做 “count” 的 state 变量
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}

/**
 * 首页
 */
@ReactRouteView({
    pathname: "home"
})
export default class HomeView extends React.Component<HomeViewProps, HomeViewState> {

    state: HomeViewState = {};


    constructor(props: Readonly<HomeViewProps>) {
        super(props);

        setTimeout(() => {
            HomeDataProvider.getName();
        }, 1000);

        setTimeout(() => {
            HomeDataProvider.getTotal();
        }, 2000);
        setTimeout(() => {
            HomeDataProvider.getSimpleObject();
            HomeDataProvider.setState({
                name: "王五"
            });
        }, 3000);
    }


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const {name, total, simpleObject} = this.props;

        console.log("name", name);

        let exaample = <Example/>;


        return <FlexView>
            <Header title={"首页"}/>
            <div>
                {name}
            </div>
            <div>
                {total}
            </div>
            <div>
                {JSON.stringify(simpleObject)}
            </div>
            {exaample}
        </FlexView>;
    }


}
