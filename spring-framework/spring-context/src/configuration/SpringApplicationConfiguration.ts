import {ApplicationConfiguration} from "./application/ApplicationConfiguration";
import {FeignConfiguration} from "./feign/FeignConfiguration";
import {ScannerConfiguration} from "./scanner/ScannerConfiguration";
import {RouteConfiguration} from "./route/RouteConfiguration";
import {ProfilesConfiguration} from "./profiles/ProfilesConfiguration";
import {NodeConfiguration} from "./node/NodeConfiguration";
import {SpringWebpackConfiguration} from "./webpack/SpringWebpackConfiguration";


export interface SpringApplicationConfiguration {


    spring: {
        application?: ApplicationConfiguration;

        //profiles
        profiles?: ProfilesConfiguration;

        // browser history config
        route?: RouteConfiguration

        //feign config
        feign?: FeignConfiguration;

        //scan config
        scanner?: ScannerConfiguration;

        //nodejs
        node?: NodeConfiguration;

    }

    //webpack
    webpack?: SpringWebpackConfiguration;

    //custom configuration，will be saved to the configuration list for injection
    // annotation @link {@Value}
    [prop: string]: any;
}

export const DEFAULT_SPRING_APPLICATION_CONFIGURATION: SpringApplicationConfiguration = {

    spring: {
        application: {
            port: 8080,
            contextPath: "/"
        },
        profiles: {
            active: ["dev"]
        },
        route: {
            model: "browser"
        },
        feign: {
            apiModules: {}
        }
    },
    webpack: {

    }
};