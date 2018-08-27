import {History, Location} from "history";
import {match} from "react-router";
import {DispatchProp} from "react-redux";
import {Dispatch} from "redux";

/**
 * redux react-router-redux 会分发到子组件的props
 */
export interface ReduxRouterProps {

    dispatch?: Dispatch<any>;

    location?: Location,

    history?: History,

    //匹配
    match?: match<any>,


}
