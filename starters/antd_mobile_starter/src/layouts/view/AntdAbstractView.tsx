import {NavBarProps} from "antd-mobile/lib/nav-bar/PropsType";
import * as React from "react";
import ReactSimpleView, {
    ReactSimpleViewProps,
    ReactSimpleViewState
} from "fengwuxp_common_react/src/views/ReactSimpleView";
import {NavBar,Icon} from "antd-mobile";
import {
    reduxRouterHandler,
    ViewLocationDescriptorObject
} from "fengwuxp_common_redux/src/router/ReduxRouterHandler";
import {LocationState} from "history";
import {ReduxRouterProps} from "fengwuxp_common_redux/src/props/ReduxRouterProps";


export interface AntdAbstractViewProps extends ReactSimpleViewProps,ReduxRouterProps {

}

export interface AntdAbstractViewState extends ReactSimpleViewState {

    navBarTitle?: string;

    navBarProps?: NavBarProps;
}


export default abstract class AntdAbstractView<P extends AntdAbstractViewProps, S extends AntdAbstractViewState>
    extends ReactSimpleView<P, S> {


    constructor(props: P, context: any) {
        super(props, context);
    }

    renderHeader = () => {

        let {navBarProps, navBarTitle} = this.state;

        if (navBarProps == null) {
            navBarProps = {};
        }

        const props: NavBarProps = {
            icon: <Icon type="left" size={"lg"}/>,
            onLeftClick: navBarProps.onLeftClick || this.goBack,
            mode: navBarProps.mode || "dark",
            ...navBarProps
        };
        return <NavBar {...props as any}><div>{navBarTitle}</div></NavBar>;
    };


    goBack = reduxRouterHandler.goBack;

    to = (location: ViewLocationDescriptorObject | string, state?: LocationState) => reduxRouterHandler.push(location, state);


}
