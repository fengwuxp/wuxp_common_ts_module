import {Component} from "../../../../../spring-framework/spring-context/src/stereotype/Component";


export interface MemberService {

    queryMember: () => Promise<any[]>;
}


@Component()
//@Component({packageName:"xxx.MemberService"})
export default class MemberServiceImple implements MemberService {

    queryMember = () => {

        return Promise.reject(["1"]);
    }


}
