import {Bean} from "typescript-spring-beans/src/annotations/Bean";
import {History, createHashHistory, createBrowserHistory} from "history"


export default class AutoConfiguration {



    @Bean()
    public history = (): History => {
        const options = {
            // basename:"${spring.application.contextPath}"
            basename: process.env.CONTEXT_PATH
        };
        if (process.env.USE_BROWSER) {
            return createBrowserHistory(options)
        } else {
            return createHashHistory(options);
        }
    }

}