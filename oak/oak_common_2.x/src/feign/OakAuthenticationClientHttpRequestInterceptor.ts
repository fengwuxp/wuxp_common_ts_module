import {
    AuthenticationStrategy,
    AuthenticationToken,
    AuthenticationType,
    CacheAuthenticationStrategy,
    ClientHttpRequestInterceptorInterface,
    getFeignClientMethodConfigurationByRequest,
    HttpRequest,
    NEVER_REFRESH_FLAG,
    UNAUTHORIZED_RESPONSE
} from "fengwuxp-typescript-feign";

import StringUtils from 'fengwuxp-common-utils/lib/string/StringUtils';


/**
 *  oak Authentication client http request interceptor
 *
 *  Support blocking 'authorization' refresh
 */
export default class OakAuthenticationClientHttpRequestInterceptor<T extends HttpRequest = HttpRequest>
    implements ClientHttpRequestInterceptorInterface<T> {

    // is refreshing status
    protected static IS_REFRESH_TOKEN_ING = false;

    // protected static waitingQueue: Array<any> = [];
    protected static WAITING_QUEUE: Array<{
        resolve: (value?: any | PromiseLike<any>) => void;
        reject: (reason?: any) => void,
        request: HttpRequest
    }> = [];

    protected static EXPIRED_MARK: number = 20 * 1000;

    // Refresh tokens 5 minutes in advance by default
    private aheadOfTimes: number;

    private authenticationStrategy: AuthenticationStrategy;

    // blocking 'authorization' refresh
    private blockingRefreshAuthorization: boolean;

    // In the loose mode, it only tries to obtain the authentication information. If it does not obtain it, it does nothing.
    private looseMode: boolean = true;

    /**
     *
     * @param authenticationStrategy
     * @param aheadOfTimes                default: 5 * 60 * 1000
     * @param blockingRefreshAuthorization
     * @param looseMode                   default: true
     */
    constructor(authenticationStrategy: AuthenticationStrategy,
                aheadOfTimes?: number,
                blockingRefreshAuthorization: boolean = true,
                looseMode: boolean = true) {
        if (authenticationStrategy.enableCache) {
            this.authenticationStrategy = new CacheAuthenticationStrategy(authenticationStrategy);
        } else {
            this.authenticationStrategy = authenticationStrategy;
        }
        this.aheadOfTimes = aheadOfTimes || 5 * 60 * 1000;
        this.blockingRefreshAuthorization = blockingRefreshAuthorization;
        this.looseMode = looseMode
    }

    interceptor = async (req: T) => {

        const looseMode = this.looseMode;
        // need force certification
        let forceCertification = !looseMode;
        const feignClientMethodConfigurationByRequest = getFeignClientMethodConfigurationByRequest(req);
        const mappingOptions = feignClientMethodConfigurationByRequest == null ? null : feignClientMethodConfigurationByRequest.requestMapping;
        if (mappingOptions != null) {
            let authenticationType = mappingOptions.authenticationType;
            if (authenticationType === AuthenticationType.NONE) {
                // none certification
                if (looseMode) {
                    forceCertification = false;
                } else {
                    return req;
                }
            } else if (authenticationType === AuthenticationType.FORCE) {
                // force none certification
                forceCertification = true;
            } else {
            }
        }

        if (!this.needAppendAuthorizationHeader(req.headers)) {
            // Prevent recursion on refresh
            return req;
        }

        const {aheadOfTimes, blockingRefreshAuthorization, authenticationStrategy} = this;
        let authorization: AuthenticationToken;
        try {
            authorization = await authenticationStrategy.getAuthorization(req);
        } catch (e) {
            if (!forceCertification) {
                return req;
            }
            return Promise.reject({
                ...UNAUTHORIZED_RESPONSE,
                data: e
            });
        }
        if (authorization == null || !StringUtils.hasText(authorization.authorization)) {
            if (!forceCertification) {
                return req;
            }
            return Promise.reject('authorization is null');
        }
        const currentTimes = new Date().getTime();
        const isNever = authorization.expireDate === NEVER_REFRESH_FLAG;
        if (!isNever && authorization.expireDate <= currentTimes - OakAuthenticationClientHttpRequestInterceptor.EXPIRED_MARK) {
            if (!forceCertification) {
                return req;
            }
            // 20 seconds in advance, the token is invalid and needs to be re-authenticated
            return Promise.reject(UNAUTHORIZED_RESPONSE);
        }

        const authorizationIsInvalid = !isNever && authorization.expireDate < currentTimes + aheadOfTimes;
        if (!authorizationIsInvalid) {
            req.headers = this.appendAuthorizationHeader(authorization, req.headers);
            return req;
        }

        if (!blockingRefreshAuthorization) {
            // Concurrent refresh
            try {
                authorization = await authenticationStrategy.refreshAuthorization(authorization, req);
            } catch (e) {
                if (!forceCertification) {
                    return req;
                }
                // refresh authorization error
                return Promise.reject({
                    ...UNAUTHORIZED_RESPONSE,
                    data: e
                });
            }

        } else {
            if (OakAuthenticationClientHttpRequestInterceptor.IS_REFRESH_TOKEN_ING) {
                // join wait queue
                return new Promise<T>((resolve, reject) => {
                    OakAuthenticationClientHttpRequestInterceptor.WAITING_QUEUE.push({
                        resolve,
                        reject,
                        request: req
                    });
                });
            } else {
                // Synchronous refresh
                OakAuthenticationClientHttpRequestInterceptor.IS_REFRESH_TOKEN_ING = true;
                // need refresh token
                let error;
                try {
                    authorization = await authenticationStrategy.refreshAuthorization(authorization, req);
                } catch (e) {
                    // refresh authorization error
                    error = e;
                    if (!looseMode) {
                        return Promise.reject(e);
                    }
                }
                const waitingQueue = [...OakAuthenticationClientHttpRequestInterceptor.WAITING_QUEUE];
                // console.log("---等待刷新token的队列--->", waitingQueue.length);
                // clear
                OakAuthenticationClientHttpRequestInterceptor.WAITING_QUEUE = [];
                OakAuthenticationClientHttpRequestInterceptor.IS_REFRESH_TOKEN_ING = false;
                waitingQueue.forEach(({reject, resolve, request}) => {
                    if (error) {
                        reject(error);
                    } else {
                        request.headers = this.appendAuthorizationHeader(authorization, request.headers);
                        resolve(request);
                    }
                });
            }
        }

        req.headers = this.appendAuthorizationHeader(authorization, req.headers);
        return req;

    };


    /**
     * append authorization header
     * @param authorization
     * @param headers
     */
    private appendAuthorizationHeader = (authorization: AuthenticationToken, headers: Record<string, string>) => {

        return this.authenticationStrategy.appendAuthorizationHeader(authorization, headers);
    };

    /**
     * need append authorization header
     * @param headers
     */
    private needAppendAuthorizationHeader = (headers: Record<string, string>) => {
        const authorizationHeaderNames = this.authenticationStrategy.getAuthorizationHeaderNames;
        const headerNames = authorizationHeaderNames ? authorizationHeaderNames() : ["Authorization"];
        const count = headerNames.map((headerName) => {
            return headers[headerName] != null ? 1 : 0;
        }).reduce((prev, current) => {
            return prev + current;
        }, 0);
        return count !== headerNames.length;
    };

    public setAuthenticationStrategy = (authenticationStrategy: AuthenticationStrategy<AuthenticationToken>) => {
        this.authenticationStrategy = authenticationStrategy;
    }
}
