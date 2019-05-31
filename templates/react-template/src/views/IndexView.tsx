import * as React from "react";
import FlexView from "../components/FlexView";
import Header from "../components/Header";
import {Example} from "../components/Example";


interface IndexViewProps {

}

interface IndexViewState {
    showExample: boolean
}

/**
 * index
 */
export default class IndexView extends React.Component<IndexViewProps, IndexViewState> {


    state: IndexViewState = {
        showExample: false
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        const {showExample} = this.state;

        return <FlexView>
            <Header title={"导航"}/>
            {
                showExample ? <Example/> : null
            }
            <button onClick={() => {
                this.setState({
                    showExample: !showExample
                })
            }}>{showExample ? "隐藏" : "显示"}</button>
            <button onClick={() => {

            }}></button>
        </FlexView>
    }
}