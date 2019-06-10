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
        //If there is only one, use  { default :"http://xxx.com/api"}
        [API_ADRESS: string]: string;
    }
}