import {Environment} from "./Environment";
import {SpringApplicationConfiguration} from "../configuration/SpringApplicationConfiguration";
import {spelExpressionParser} from "../expression/SpelExpressionParser";

const ENV = process.env || {};

export default class YamlConfigurationEnvironment implements Environment {


    private springApplicationConfiguration: SpringApplicationConfiguration;


    constructor(SpringApplicationConfiguration: SpringApplicationConfiguration) {
        this.springApplicationConfiguration = SpringApplicationConfiguration;
    }

    getActiveProfiles = () => ENV.NODE_ENV || [];


    getApplicationConfiguration = () => {

        return this.springApplicationConfiguration;
    };

    getProperty = (expression: string) => {

        return spelExpressionParser(expression, this.springApplicationConfiguration);
    };

    getEnvVariable = <T>(variableName: string): T => {
        return ENV[variableName];
    };


}