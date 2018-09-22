const configs = require('./webpack.config.js');
const ip = "localhost";
const pathTo = require('path');
const chalk = require('chalk');
const port=9088;

let config = Array.isArray(configs) ? configs[0] : configs;


/**
 * 接口请求被代理的入口地址
 * @type {string}
 */
// const proxyTarget = `http://kt.oaknt.com/api/`;
const proxyTarget = `http://www.zgmiaocai.com/api/`;

/**
 * 代理服务器地址的web contenx
 * @type {RegExp}
 */
const proxyServerWebContext = 'api';


config.devServer = {
    contentBase: pathTo.join(__dirname, ''),
    compress: true,
    host: '0.0.0.0',
    public:`${ip}:${port}`,
    proxy: {
        '/api': {
            target: proxyTarget,
            pathRewrite: {'^/api': '/'},
            changeOrigin: true,
            secure: false,
            //重写cookie
            onProxyRes: function (proxyRes, req, res) {
                // console.log("重写cookie");
                let cookies = proxyRes.headers['set-cookie'];
                let cookieRegex = new RegExp(`Path=\\/${proxyServerWebContext}\\/`, "i");
                // let cookieRegex = /Path=\/udf\//i;
                //修改cookie Path
                if (cookies) {
                    let newCookie = cookies.map(function (cookie) {
                        if (cookieRegex.test(cookie)) {
                            return cookie.replace(cookieRegex, 'Path=/');
                        }
                        return cookie;
                    });
                    //修改cookie path
                    delete proxyRes.headers['set-cookie'];
                    proxyRes.headers['set-cookie'] = newCookie;
                }
            }
        }

    },
};

console.log('server is running! Please open ' + chalk.green(`http://${ip}:${port}/index.html`));
module.exports = config;
