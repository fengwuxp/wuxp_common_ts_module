import * as React from "react";
import {Condition} from "../../../spring-context/src/condition/ConditionType";
import {Redirect} from "react-router";

/**
 * condition render
 */
interface ConditionRouteRenderProps {

    condition: Condition;

    readonly children?: any;

    // not permission view path
    noPermissionView?: string;
}


export const ConditionRouteRender = (props: ConditionRouteRenderProps) => {


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
                pathname:  noPermissionView == null ? "/no_permission" : noPermissionView.startsWith("/") ? noPermissionView : `/${noPermissionView}`,
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