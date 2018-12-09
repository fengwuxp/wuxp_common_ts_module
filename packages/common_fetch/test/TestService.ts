import {RequestMapping} from "../src/annotations/mapping/RequestMapping";
import {Feign} from "../src/annotations/Feign";
import {FetchOptions} from "../src/FetchOptions";
import {Signature} from "../src/annotations/security/Signature";
import {FeignProxy} from "../src/proxy/ProxyApiService";
import {DeleteMapping} from "../src/annotations/mapping/DeleteMapping";
import {ReqMethod} from "../src/constant/ReqMethod";
import {GetMapping} from "../src/annotations/mapping/GetMapping";


/**
 * 测试服务
 * @author wxup
 * @create 2018-11-03 9:34
 **/
@Feign({
    apiModule: "member",
    value: "test"
})
export default class TestService extends FeignProxy {


    //禁止外部实例化
    // private constructor() {
    //     super();
    // }

    @Signature({fields: []})
    @RequestMapping({value: "/test", method: ReqMethod.GET})
    testQuery: (evt: any, options?: FetchOptions) => Promise<any>;

    @Signature({fields: ["userName"]})
    @GetMapping({value: "/test", headers: {myHeader: "tk_{memberId}"}})
    findMember: (
        request: {
            userName: string,
            memberId: number,
        },
        options?: FetchOptions) => Promise<any>;

    @Signature({fields: ["memberId"]})
    @DeleteMapping({value: "/delete_member/{memberId}"})
    deleteMember: (
        request: {
            memberId: number
        },
        options?: FetchOptions) => Promise<number>;
}


