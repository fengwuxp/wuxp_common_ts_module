
import {RequestMapping} from "../src/decorator/mapping/RequestMapping";
import {Feign} from "../src/decorator/Feign";
import {FetchOptions} from "../src/fetch/FetchOptions";
import {Signature} from "../src/decorator/security/Signature";


/**
 * 测试服务
 * @author wxup
 * @create 2018-11-03 9:34
 **/
@Feign({
    apiModule: "member"
})
export default class TestService {


    @Signature({fields: []})
    @RequestMapping({value: "/test"})
    testQuery: (evt: any, options: FetchOptions) => Promise<any>;

    @Signature({fields: ["userName"]})
    @RequestMapping({value: "/test"})
    findMember: (
        userName: string,
        memberId: number,
        options: FetchOptions) => Promise<any>
}
