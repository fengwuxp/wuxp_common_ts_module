/**
 *  The recommended profile value is used by default
 */
export enum ProfilesType {

    LOCAL = "local",

    DEV = "dev",

    TEST = "test",

    PROD = "prod",

    RELEASE = "release"
}

export type Profiles = ProfilesType | string;


export interface ProfilesConfiguration {

    active: Profiles[];
}