export interface RouteConfiguration {

    /**
     * route model
     * default "browser"
     */
    model?: "browser" | "hash";


    /**
     * login view
     * default "/login"
     */
    loginView?: string;

    /**
     * no permission view
     * default "/no_permission"
     */
    noPermissionView?: string;

    /**
     * require auth
     * default false
     */
    requiredAuth?: boolean;


    /**
     * 是否准确匹配路由
     * default null
     */
    exact?: boolean;

    /**
     * default null
     */
    strict?: boolean;
}