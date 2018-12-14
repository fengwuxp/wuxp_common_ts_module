import {Feign, FetchOptions, PostMapping} from "oak_taro_starter/lib";

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

console.log("---");

@Feign({
    value: "MemberSpaceService"
})
class MemberSpaceServiceImpl implements MemberSpaceService {


    @PostMapping({})
    queryLikeStore: (req: any, option?: FetchOptions) => Promise<any[]>;


}

export default new MemberSpaceServiceImpl()
