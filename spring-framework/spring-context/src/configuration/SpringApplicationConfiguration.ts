import {ApplicationConfiguration} from "./application/ApplicationConfiguration";
import {FeignConfiguration} from "./feign/FeignConfiguration";
import {ScannerConfiguration} from "./scanner/ScannerConfiguration";


export interface SpringApplicationConfiguration {

    application?: ApplicationConfiguration;

    feign?: FeignConfiguration;

    scanner?: ScannerConfiguration;

    //custom configuration，will be saved to the configuration list for injection
    // annotation @link {@Value}
    [prop: string]: any;
}