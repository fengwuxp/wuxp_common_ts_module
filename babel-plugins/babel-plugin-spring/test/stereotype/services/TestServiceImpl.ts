import {TestService} from "./TestService";
import { Service } from "../../../../../spring-framework/spring-context/src/stereotype/Service";


@Service()
export default class TestServiceImpl implements TestService {
    a = () => {

        console.log("aaa->")
    };
    b = () => {
        return "b";
    };


}
