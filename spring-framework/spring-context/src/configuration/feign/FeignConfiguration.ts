/**
 * feign代理的配置
 */
export interface FeignConfiguration {

    /**
     * api modules 列表
     * example :
     *    - member: http://xxx.member.com
     *    - order: http://xxx.order.com
     */
    apiModules: {
        [api: string]: string;
    }
}