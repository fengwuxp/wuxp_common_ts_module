import {ApplicationContext} from "./ApplicationContext";
import {Environment} from "../env/Environment";
import YamlConfigurationEnvironment from "../env/YamlConfigurationEnvironment";
import SpringWebApplicationConfiguration from "../../../.spring/SpringWebApplicationConfiguration"

class SpringApplicationContext implements ApplicationContext {


    protected environment: Environment;


    constructor() {
        this.environment = new YamlConfigurationEnvironment(SpringWebApplicationConfiguration);
    }

    getEnvironment = (): Environment => this.environment;


}

const springApplicationContext: SpringApplicationContext = new SpringApplicationContext();

export default springApplicationContext;