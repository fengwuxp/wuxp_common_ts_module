import * as React from "react";
import Loadable from "react-loadable";

let Loading: React.ComponentType = () => <div>loading</div>;

/**
 * 异步加载组件
 * @param component
 * @returns {React.ComponentType<T>}
 */
export default function asyncComponent<T>(component: any): React.ComponentType<T> {


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

/**
 * 设置默认的异步加载组件的loading
 * @param componentLoading
 */
export function setDefaultLoadingComponent(componentLoading: React.ComponentType) {
    Loading = componentLoading
}
