import {TestService} from "./TestService";
import {AutoWried} from "fengwuxp-spring-beans/lib/src/annotations/AutoWried";
import {Service} from "../../../../../spring-framework/spring-context/src/stereotype/Service";


/**
 * example service
 */
export interface ExampleService<T,K> {

    useTest: () => void;
}

/**
 * abstract example service
 */
abstract class AbstractExampleService {

}

@Service()
export class ExampleServiceImpl<T> extends AbstractExampleService implements ExampleService<T,string> {

    @AutoWried()
    private testService: TestService;

    useTest = () => {

        this.testService.a();
        const b = this.testService.b();

        console.log("use test", b);
    };


}
