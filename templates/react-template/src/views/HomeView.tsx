import * as React from "react";
import FlexView from "../components/FlexView";
import Header from "../components/Header";
import {ReactRouteView} from "common_state/src/annotations/ReactRouteView";
import HomeDataProvider from "../provider/HomeDataProvider";
const homeDataProvider = new HomeDataProvider();
export interface HomeViewProps {

    name: string;

    total: number;

    simpleObject: object
}

interface HomeViewState {
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
    }

    componentDidMount(): void {

        // console.log("HomeDataProvider",homeDataProvider);
        setTimeout(() => {
            homeDataProvider.getName();
        }, 1000);

        setTimeout(() => {
            homeDataProvider.getTotal();
        }, 2000);
        setTimeout(() => {
            homeDataProvider.getSimpleObject();
        }, 2000);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const {name, total, simpleObject} = this.props;

        console.log("name", name);

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
        </FlexView>;
    }

}