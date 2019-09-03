import {FetchAdapter} from "../adapter/FetchAdapter";
import {FetchInterceptor} from "../interceptor/FetchInterceptor";

/**
 * feign configuration builder
 */
export interface FeignConfigurationBuilder {

    fetchAdapter: (fetchAdapter: FetchAdapter) => this;

    addInterceptor: (fetchInterceptor: FetchInterceptor) => this;
}
