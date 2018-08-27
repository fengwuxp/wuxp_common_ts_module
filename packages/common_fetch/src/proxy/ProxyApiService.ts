// import {ServiceEvt} from "../model/ServiceEvt";
import {FetchOptions} from "../fetch/FetchOptions";

/**
 * 代理的服务 定义
 */
export interface ProxyApiService {



    /**
     * 获取api服务的根路径，需要带上最后的的 "/"
     * 例如：http://xxx.xx.com/api/或 /member
     * 或者在压缩打包的时候没有保存 class的名称则需要使用这个
     */
    basePath?: string;

    /**
     * 服务方法
     */
    // [prop: string]: ServiceMethod<any> | string;
}

/**
 * 服务方法定义
 */
type ServiceMethod<R> = (req: R, options?: FetchOptions) => any;