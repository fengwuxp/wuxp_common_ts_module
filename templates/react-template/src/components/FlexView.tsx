import * as React from "react";


interface FlexViewProps {

}

interface FlexViewState {

}

/**
 * flex view
 */
export default class FlexView extends React.Component<FlexViewProps, FlexViewState> {


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <div>
            {this.props.children}
        </div>;
    }
}