import * as React from "react";
import FlexView from "../components/FlexView";
import Header from "../components/Header";


interface IndexViewProps {

}

interface IndexViewState {

}

/**
 * index
 */
export default class IndexView extends React.Component<IndexViewProps, IndexViewState> {


    state: IndexViewState = {};

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        const {} = this.state;

        return <FlexView>
            <Header title={"导航"}/>
        </FlexView>
    }
}