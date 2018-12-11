const webpack = require('webpack');
const config = require('./webpack.config.js');
const ip = "localhost";
const pathTo = require('path');
const chalk = require('chalk');
const port = 9088;
const {DEV_API_DOMAIN} = require('./webpack-config/WebpackConfig');
const {rewriteCooke} = require('common_webpack/lib/utils/DevProxyRewriteCookie');
/**
 * 接口请求被代理的入口地址
 * @type {string}
 */
const proxyTarget = `http://${DEV_API_DOMAIN}/api/`;

/**
 * 代理服务器地址的web contenx
 * @type {RegExp}
 */
const proxyServerWebContext = 'api';

//移除掉最后一个插件，即DefinePlugin
config.plugins.pop();
config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            API_ROOT_PATH: JSON.stringify(`/api`),
            STATIC_RESOURCE_ROOT_PATH: JSON.stringify(`http://${DEV_API_DOMAIN}`)
        }
    })
);


config.devServer = {
    contentBase: pathTo.join(__dirname, ''),
    compress: true,
    host: '0.0.0.0',
    public: `${ip}:${port}`,
    proxy: {
        '/api': {
            target: proxyTarget,
            pathRewrite: {'^/api': '/'},
            changeOrigin: true,
            secure: false,
            //代理结果响应处理
            onProxyRes: function (proxyRes, req, res) {
                //重写cookie
                rewriteCooke(proxyRes, req, res)(proxyServerWebContext);
            }
        }

    },
    //如果你的应用使用HTML5 history API，
    //你可能需要使用index.html响应404或者问题请求，只需要设置g historyApiFallback: true即可
    historyApiFallback: true
};
console.log('server is running! Please open ' + chalk.green(`http://${ip}:${port}/index.html`));
module.exports = config;
