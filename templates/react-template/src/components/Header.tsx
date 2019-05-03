import * as React from "react";


interface HeaderProps {

    title: string;
}

interface HeaderState {

}


/**
 * header
 */
export default class Header extends React.Component<HeaderProps, HeaderState> {


    state: HeaderState = {};

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        const {title} = this.props;

        return <header>{title}</header>;
    }

}