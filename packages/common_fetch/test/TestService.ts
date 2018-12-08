import {RequestMapping} from "../src/annotations/mapping/RequestMapping";
import {Feign, FeignOptions} from "../src/annotations/Feign";
import {FetchOptions} from "../src/fetch/FetchOptions";
import {Signature} from "../src/annotations/security/Signature";
import {FeignProxy, ProxyApiService, ProxyApiServiceConfig} from "../src/proxy/ProxyApiService";
import {DeleteMapping} from "../src/annotations/mapping/DeleteMapping";


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
    @RequestMapping({value: "/test"})
    testQuery: (evt: any, options: FetchOptions) => Promise<any>;

    @Signature({fields: ["userName"]})
    @RequestMapping({value: "/test"})
    findMember: (
        userName: string,
        memberId: number,
        options: FetchOptions) => Promise<any>;

    @Signature({fields: ["memberId"]})
    @DeleteMapping({value: "/delete_member"})
    deleteMember: (memberId: number, options: FetchOptions) => Promise<number>;
}
