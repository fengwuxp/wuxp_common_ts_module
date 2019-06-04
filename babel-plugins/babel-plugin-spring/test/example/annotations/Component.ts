import {Scope} from "../enums/Scope";


export interface ComponentOptions {

    name?: string;

    /**
     * default singleton
     */
    scope?: Scope,

    packageName?: string;
}


export function Component(options?: ComponentOptions) {

    const _options: ComponentOptions = {
        ...(options || {}),
        scope: Scope.singleton
    };

    return (target) => {


        return target;
    }
}
