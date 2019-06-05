import MemberService from "./components/MemberService";
import {AutoWried} from "./annotations/AutoWried";
import {BaseController, Controller} from "./controller/BaseController";
import {ReactView} from "spring-framework/spring-react/src/route/ReactView";


@ReactView({
    name: "首页",
    pathname: "test",
    exact: true
})
export default class IndexController extends BaseController implements Controller<number> {

    @AutoWried({})
    private memberService: MemberService;

    //@AutoWried({
    //     //   requireType:"xxx.MemberService"
    //     // })
    //memberService;


    constructor() {
        super();
    }

    public testMethod = (): string => {
        return "";
    }
}