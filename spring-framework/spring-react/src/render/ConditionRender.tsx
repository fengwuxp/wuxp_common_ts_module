import * as React from "react";
import {Condition} from "../condition/Condition";

/**
 * condition render
 */
interface ConditionRenderProps {

    condition: Condition;

    readonly children?: any
}


export const ConditionRender = (props: ConditionRenderProps) => {


    const {condition, children} = props;

    let r = false;
    if (typeof condition === "function") {
        r = condition(null) as boolean;
    } else {
        r = condition as boolean;
    }

    if (!r) {
        return null;
    }

    return <>
        {children}
    </>;
};