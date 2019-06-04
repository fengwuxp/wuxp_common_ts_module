import {Component} from "../annotations/Component";

export interface MemberService {

    queryMember: () => Promise<any[]>;
}


@Component()
//@Component({packageName:"xxx.MemberService"})
export default class MemberService implements MemberService {
    queryMember: () => Promise<any[]>;


}