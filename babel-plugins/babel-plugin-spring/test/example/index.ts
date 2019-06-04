import {Component} from "./annotations/Component";
import MemberService from "./components/MemberService";
import {AutoWried} from "./annotations/AutoWried";
import {BaseController, Controller} from "./controller/BaseController";


@Component()
export default class IndexController extends BaseController implements Controller<number>{

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