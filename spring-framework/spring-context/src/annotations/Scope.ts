

/**
 * @target Class
 * @param value
 * @constructor
 */
export const Scope = (value: string) => {

    return (target) => {

    }
};


export enum ScopeValue {

    singleton,

    prototype,

    request,

    session
}
