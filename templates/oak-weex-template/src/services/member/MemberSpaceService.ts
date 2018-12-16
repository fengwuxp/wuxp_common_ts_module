import {FetchOptions} from "common_fetch/src/FetchOptions";
import {Feign} from "common_fetch/src/annotations/Feign";
import {Signature} from "common_fetch/src/annotations/security/Signature";
import {PostMapping} from "common_fetch/src/annotations/mapping/PostMapping";

/**
 * 会员空间
 */
interface MemberSpaceService {

    /**
     * 获取常购店铺
     * @param req 请求参数
     * @param option 请求配置
     */
    queryLikeStore: (req: any, option?: FetchOptions) => Promise<any[]>;


}

@Feign({
    value: "MemberSpaceService"
})
class MemberSpaceServiceImpl implements MemberSpaceService {


    @Signature({fields: []})
    @PostMapping({})
    queryLikeStore: (req: any, option?: FetchOptions) => Promise<any[]>;


}

export default new MemberSpaceServiceImpl()
