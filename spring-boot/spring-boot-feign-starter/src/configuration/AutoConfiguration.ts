import {Bean} from "fengwuxp-spring-beans/src/annotations/Bean";
import {History, createHashHistory, createBrowserHistory} from "history"
import {Value} from "typescirpt-spring-context/src/annoations/Value";

export default class AutoConfiguration {

    @Value("spring.application.contextPath")
    private contextPath: string;

    @Value("spring.route.model")
    private historyModel: string;

    @Bean()
    public history = (): History => {
        const options = {
            basename: this.contextPath
        };
        if (this.historyModel === "browser") {
            return createBrowserHistory(options)
        } else {
            return createHashHistory(options);
        }
    }

}