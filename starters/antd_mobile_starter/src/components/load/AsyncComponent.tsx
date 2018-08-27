import * as React from "react";
import Loadable from 'react-loadable';

let Loading = null;

/**
 * 异步加载组件
 * @param component
 * @returns {React.ComponentType<T>}
 */
export default function asyncComponent<T>(component: any): React.ComponentType<T> {


    if (Loading === null) {
        Loading=require("./Loading").default;
    }

    const C: React.ComponentType<T> = Loadable({
        loader: () => component(),
        loading: () => <Loading/>
    });


    class AsyncComponent extends React.Component<T, any> {
        render() {
            return C ? <C {...this.props}/> : null
        }
    }

    return AsyncComponent;
}

export function setDefaultLoadingComponent(componentLoading: any) {
    Loading = componentLoading
}
