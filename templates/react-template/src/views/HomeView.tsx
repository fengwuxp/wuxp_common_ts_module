import * as React from "react";
import FlexView from "../components/FlexView";
import Header from "../components/Header";


interface HomeViewProps {

}

interface HomeViewState {

}

/**
 * 首页
 */
export default class HomeView extends React.Component<HomeViewProps, HomeViewState> {


    state: HomeViewState = {};


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <FlexView>
            <Header title={"首页"}/>
        </FlexView>;
    }

}