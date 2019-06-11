import {ApplicationContext} from "./ApplicationContext";
import {Environment} from "../env/Environment";


export interface EnvironmentApplicationContext extends ApplicationContext{

    getEnvironment: () => Environment;
}