/**
 * 全局的路径配置
 */
export interface GlobalRouterRouteConfig {

    /**
     * 全局的路由是否需要鉴权
     * 默认 false
     */
    requiredAuth?: boolean;

    /**
     * 登录的uri，默认 'login'
     */
    toLoginViewPathname?: string;
}