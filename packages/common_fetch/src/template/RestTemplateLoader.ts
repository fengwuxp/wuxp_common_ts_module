import {RestTemplate} from "./RestTemplate";


/**
 * rest template loader
 */
export interface RestTemplateLoader {

    load: (apiModuleName: string) => RestTemplate;
}

export abstract class AbstractRestTemplateLoader implements RestTemplateLoader {

    /**
     * rest template cache
     */
    protected restTemplateCache: Map<string, RestTemplate> = new Map<string, RestTemplate>();


    load = (apiModuleName: string): RestTemplate => {

        let restTemplate = this.restTemplateCache.get(apiModuleName);
        if (restTemplate == null) {
            //加载template
            restTemplate = this.buildRestTemplate(apiModuleName);
            this.restTemplateCache.set(apiModuleName, restTemplate);
        }
        return restTemplate;
    };


    abstract buildRestTemplate: (apiModuleName: string) => RestTemplate;


}