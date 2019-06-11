import {Environment} from "../env/Environment";
// import YamlConfigurationEnvironment from "../env/YamlConfigurationEnvironment";
// import SpringWebApplicationConfiguration from "../../../.spring/SpringWebApplicationConfiguration"
import {EnvironmentApplicationContext} from "./EnvironmentApplicationContext";
import {AutoWried} from "typescript-spring-beans/src/annotations/AutoWried";
import {ApplicationContext} from "./ApplicationContext";

class SpringApplicationContext implements EnvironmentApplicationContext {


    @AutoWried()
    private environment: Environment;


    constructor() {
        // this.environment = new YamlConfigurationEnvironment(SpringWebApplicationConfiguration);
    }

    getEnvironment = (): Environment => this.environment;


    getParent = (): ApplicationContext => {

        return null;
    };


}

const springApplicationContext: SpringApplicationContext = new SpringApplicationContext();

export default springApplicationContext;