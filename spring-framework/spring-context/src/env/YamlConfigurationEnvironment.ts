import {Environment} from "./Environment";
import {SpringApplicationConfiguration} from "../configuration/SpringApplicationConfiguration";
import {spelExpressionParse} from "../expression/ExpressionParser";


export default class YamlConfigurationEnvironment implements Environment {


    protected springApplicationConfiguration: SpringApplicationConfiguration;


    constructor(SpringApplicationConfiguration: SpringApplicationConfiguration) {
        this.springApplicationConfiguration = SpringApplicationConfiguration;
    }

    getActiveProfiles = () => process.env.NODE_ENV || [];


    getApplicationConfiguration = () => {

        return this.springApplicationConfiguration;
    };
    getProperty = (expression: string) => {

        return spelExpressionParse(expression, this.springApplicationConfiguration);
    };


}