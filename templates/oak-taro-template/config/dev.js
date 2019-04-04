// const {rewriteCooke} = require('common_webpack/lib/utils/DevProxyRewriteCookie');
const ip = "localhost";
const port = 9088;
const pathTo = require('path');

/**
 * 接口请求被代理的入口地址
 * @type {string}
 */
const proxyTarget = `https://localhost:18080/api/`;
/**
 * 代理服务器地址的web contenx
 * @type {RegExp}
 */
const proxyServerWebContext = 'api';

module.exports = {
    env: {
        NODE_ENV: '"development"',
    },
    defineConstants: {},
    weapp: {},
    h5: {
        devServer: {
            port: port,
            contentBase: pathTo.join(__dirname, ''),
            compress: true,
            // host: '0.0.0.0',
            public: `${ip}:${port}`,
            // proxy: {
            //     '/api': {
            //         target: proxyTarget,
            //         pathRewrite: {'^/api': '/'},
            //         changeOrigin: true,
            //         secure: false,
            //         //代理结果响应处理
            //         onProxyRes: function (proxyRes, req, res) {
            //             //重写cookie
            //             rewriteCooke(proxyRes, req, res)(proxyServerWebContext);
            //         }
            //     }
            //
            // },
        }
    },

};
