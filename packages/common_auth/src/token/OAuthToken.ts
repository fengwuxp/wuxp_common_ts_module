/**
 * oauth 标准的token 信息
 * @author wxup
 * @create 2018-09-29 16:56
 **/

export interface OAuthToken {

    /**
     * token
     */
    access_token: string;

    /**
     * token 类型
     */
    token_type: string;

    /**
     * 刷新token
     */
    refresh_token: string;

    /**
     * 有效期，单位秒
     */
    expires_in: number;

    /**
     * 范围
     */
    scope: string;
}
