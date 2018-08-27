import * as React from "react";


/**
 * FlexViewProps
 */
export interface FlexViewProps {

    style?: React.CSSProperties;

    className?: string;

    header?: React.ReactNode;

    footer?: React.ReactNode;
}

const flexCell: React.CSSProperties = {
    flex: 1
};

export default class FlexView extends React.Component<FlexViewProps, any> {

    constructor(props: FlexViewProps, context: any, state: any = {}) {
        super(props, context);
        this.state = state;
    }

    render(): React.ReactNode {
        return (
            <div style={this.props.style}
                 className={this.props.className}>
                {this.props.header}
                {this.props.children}
                {this.props.footer}
            </div>
        )
    }
}
