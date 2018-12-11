import {FetchOptions} from "common_fetch/src/FetchOptions";
import {Feign} from "common_fetch/src/annotations/Feign";


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
export default class MemberSpaceServiceImpl implements MemberSpaceService {

    queryLikeStore: (req: any, option?: FetchOptions) => Promise<any[]> = undefined;


}
