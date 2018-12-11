"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 在 webpack dev的proxy中重写cookie
 * @param proxyRes
 * @param req
 * @param res
 */
exports.rewriteCooke = function (proxyRes, req, res) {
    /**
     * @proxyServerWebContext {string} 代理的接口服务的上下问路径 例如 http://tst.abc.com/api的上下文路径为 api
     */
    return function (proxyServerWebContext) {
        // console.log("重写cookie");
        var cookies = proxyRes.headers['set-cookie'];
        var cookieRegex = new RegExp("Path=\\/" + proxyServerWebContext + "\\/", "i");
        //修改cookie Path
        if (cookies) {
            var newCookie = cookies.map(function (cookie) {
                if (cookieRegex.test(cookie)) {
                    return cookie.replace(cookieRegex, 'Path=/');
                }
                return cookie;
            });
            //修改cookie path
            delete proxyRes.headers['set-cookie'];
            proxyRes.headers['set-cookie'] = newCookie;
        }
    };
};
