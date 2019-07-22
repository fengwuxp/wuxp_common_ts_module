import MemberService from "./components/MemberService";
import {AutoWried} from "./annotations/AutoWried";
import {BaseController, Controller} from "./controller/BaseController";
import {ReactView} from "fengwuxp-spring-contex/src/annoations/ReactView";


@ReactView({
    pathname: "index",
    name: "测试页面",
    //是否可以可以进入该页面，如果没有权限则跳转到无权限的页面
    condition: (context) => {
        //通过 context 进行判断是否有进入该页面的权限
        //或者是 定义一组权限列表 ["member.add","member.edit"]
        return true;
    },
    // condition: ["member.add","member.edit"],
    // condition: "member.add",
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