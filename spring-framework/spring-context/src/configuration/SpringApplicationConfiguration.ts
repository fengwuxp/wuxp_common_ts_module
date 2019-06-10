import {ApplicationConfiguration} from "./application/ApplicationConfiguration";
import {FeignConfiguration} from "./feign/FeignConfiguration";
import {ScannerConfiguration} from "./scanner/ScannerConfiguration";
import {RouteConfiguration} from "./route/RouteConfiguration";


export interface SpringApplicationConfiguration {


    spring: {
        application?: ApplicationConfiguration;

        // browser history config
        route?: RouteConfiguration

        //feign config
        feign?: FeignConfiguration;

        //scan config
        scanner?: ScannerConfiguration;
    }

    //custom configuration，will be saved to the configuration list for injection
    // annotation @link {@Value}
    [prop: string]: any;
}

export const DEFAULT_OPTIONS: SpringApplicationConfiguration = {

    spring: {
        application: {
            port: 8080,
            contextPath: "/"
        },
        route: {
            model: "browser"
        },
        feign: {
            apiModules: {}
        }
    }
};