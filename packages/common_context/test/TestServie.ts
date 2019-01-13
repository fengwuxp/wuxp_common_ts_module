import {Autowired} from "../src/beans/factory/annotation/Autowired";


export class MemberService {

}


export default class  TestService{

    @Autowired()
    protected memberService:MemberService;
}