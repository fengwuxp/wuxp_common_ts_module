import * as React from "react";
import {ConditionType} from "typescript-spring-context/src/condition/ConditionType";
import {Redirect} from "react-router";

/**
 * condition render
 */
interface ConditionRouteRenderProps {

    readonly condition: ConditionType;

    // not permission view path
    readonly noPermissionView?: string;
}


export const ConditionRouteRender:React.FunctionComponent<ConditionRouteRenderProps> = (props) => {


    const {condition, children, noPermissionView} = props;

    if (condition != null) {
        let r = false;
        if (typeof condition === "function") {
            r = condition(props["context"], ...props) as boolean;
        } else {
            r = condition as boolean;
        }

        if (!r) {
            return <Redirect to={{
                pathname: noPermissionView == null ? "/no_permission" : noPermissionView.startsWith("/") ? noPermissionView : `/${noPermissionView}`,
                state: {
                    from: props["location"]
                }
            }}>
            </Redirect>;
        }
    }


    return <>
        {children}
    </>;
};