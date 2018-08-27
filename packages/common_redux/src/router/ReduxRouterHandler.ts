import {go, goBack, goForward, push, replace, RouterAction} from "react-router-redux";
import {LocationDescriptor, LocationDescriptorObject, LocationState} from "history";
import {stringify} from "querystring";
import ReducerRegistry from "../registry/ReducerRegistry";

export interface ViewLocationDescriptorObject extends LocationDescriptorObject {

    params?: {};
}


const DEFAULT_STORE = ReducerRegistry.storeRepository.getStore();
/**
 * 路由持有者
 */
export const reduxRouterHandler = {
    push: (location: ViewLocationDescriptorObject | string, state?: LocationState) => {
        if (typeof location !== "string") {
            location.search = stringify(location.params);
        }

        return DEFAULT_STORE.dispatch(push(location, state))
    },
    replace: (location: LocationDescriptor, state?: LocationState) => DEFAULT_STORE.dispatch(replace(location, state)),

    go: (n: number) => DEFAULT_STORE.dispatch(go(n)),

    goBack: () => DEFAULT_STORE.dispatch(goBack()),

    goForward: () => DEFAULT_STORE.dispatch(goForward()),
};