import {SpringApplicationConfiguration} from "../configuration/SpringApplicationConfiguration";

export interface Environment {

    getApplicationConfiguration: () => SpringApplicationConfiguration;

    getActiveProfiles: () => string[];

    /**
     * @param expression ${a.b.c}
     */
    getProperty: (expression: string) => string;

    /**
     * get process.env[variableName]
     * @param variableName
     */
    getEnvVariable: <T>(variableName: string) => T;
}