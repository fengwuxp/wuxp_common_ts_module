import {SpringApplicationConfiguration} from "../configuration/SpringApplicationConfiguration";

export interface Environment {

    getApplicationConfiguration: () => SpringApplicationConfiguration;

    getActiveProfiles: () => string[];

    /**
     * @param expression ${a.b.c}
     */
    getProperty: (expression:string) => string;
}