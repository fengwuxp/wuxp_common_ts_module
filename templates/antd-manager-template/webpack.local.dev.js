const webpack = require('webpack');
const config = require("./webpack.config");
const path = require("path");
const host = "localhost";
const port = 9091;

config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify("dev"),
            ROOT_DOMAIN: JSON.stringify(`${host}:9091`),
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
            target: `http://localhost:8086/udf`,
            pathRewrite: {'^/api': '/'},
            changeOrigin: true,
            secure: false,
            // cookieDomainRewrite: {
            //     "*": "/"
            // },
            //重写cookie
            onProxyRes: function (proxyRes, req, res) {
                // console.log("重写cookie");
                let cookies = proxyRes.headers['set-cookie'];
                let cookieRegex = /Path=\/udf\//i;
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
    historyApiFallback: true,
    // before(app) {
    //     app.use(function (req, res, next) {
    //         let url = req.url.trim();
    //         console.log(`发起请求->${url}`);
    //         if (url.split(".")[1].trim() === 0 && url.indexOf("/api/") < 0) {
    //             req.url = public;
    //             console.log(`重定向到首页->${req.url}`);
    //         }
    //         next();
    //     });
    // },
    // after(app) {
    //     console.log("执行after");
    //     app.use(function (req, res, next) {
    //     });
    // }

};

module.exports = config;
