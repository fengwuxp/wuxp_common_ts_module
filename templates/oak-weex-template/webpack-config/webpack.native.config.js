const webpack = require('webpack');
const config = require("common_webpack/lib/weex/native/webpack.native.config").default;

const {DEV_API_DOMAIN} = require("./WebpackConfig");

config.plugins.unshift(new webpack.DefinePlugin({
    'process.env': {
        API_ROOT_PATH: JSON.stringify(`http://${DEV_API_DOMAIN}/api`),
        STATIC_RESOURCE_ROOT_PATH: JSON.stringify(`http://${DEV_API_DOMAIN}`)
    }
}));

module.exports = config;
