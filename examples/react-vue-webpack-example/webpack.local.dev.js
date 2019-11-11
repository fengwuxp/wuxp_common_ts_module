const path = require("path");
const webpack = require("webpack");
const config = require("./webpack.config");
const ip = require('quick-local-ip').getLocalIP4();

const host = ip; //"localhost";
const port = 9000;

/**
 * 接口请求被代理的入口地址
 * @type {string}
 */
const proxyTarget = `http://localhost:9018/api/`;
// const proxyTarget = `http:///api/`;

/**
 * 代理服务器地址的web context
 * @type {RegExp}
 */
const proxyServerWebContext = 'api';

// const public = `${host}:${port}`;
config.output.publicPath = "/react/";

// login

// v-ma.com/vma/官网/dist/login
// /home/vma/官网/dist/index.html
// /vma/官网/dist/.


config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            API_ROOT_PATH: JSON.stringify(`/api`),
        }
    })
);

config.devServer = {
    contentBase: path.join(__dirname, config.output.publicPath),
    compress: true,
    host: '0.0.0.0',
    public: `${ip}:${port}`,
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
    historyApiFallback: {
        rewrites: [{
            from: /.*/g,
            to: path.posix.join(config.output.publicPath, "index.html")
        }]

    }

};

module.exports = config;
