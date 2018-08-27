const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = require("./webpack.config");
const path = require("path");
const host = "localhost";
const port = 9000;

/**
 * 接口请求被代理的入口地址
 * @type {string}
 */
const proxyTarget = `http://localhost:8088/h5/`;

/**
 * 代理服务器地址的web contenx
 * @type {RegExp}
 */
const proxyServerWebContext = 'h5';

config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify("dev"),
            // ROOT_DOMAIN: JSON.stringify(`/`),
            BASE_NAME: JSON.stringify("/")
        }
    })
);
const public = `${host}:${port}`;

config.devServer = {
    contentBase: path.join(__dirname, ''),
    compress: true,
    host: host,
    port,    //设置端口号
    public,

    publicPath: '/',
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
        },

    },

    //如果你的应用使用HTML5 history API，
    //你可能需要使用index.html响应404或者问题请求，只需要设置g historyApiFallback: true即可
    historyApiFallback: true

};

module.exports = config;
