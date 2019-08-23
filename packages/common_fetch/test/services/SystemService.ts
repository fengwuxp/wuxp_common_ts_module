import {PostMapping} from "../../src/annotations/mapping/PostMapping";
import {Feign} from "../../src/annotations/Feign";
import {FetchOptions} from "../../src/FetchOptions";

@Feign({
    value: 'SystemService',
})
class SystemService {

    /**
     * 1:方法：获取服务端当前时间
     * 2:返回值在java中的类型为：ServiceResp
     * 3:返回值在java中的类型为：Long
     **/
    @PostMapping({})
    currentTime: (req: {}, option?: FetchOptions) => Promise<number>;
}

export default new SystemService();