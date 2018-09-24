const webpack = require('webpack');
const config = require("common_webpack/lib/weex/native/webpack.native.config.prod").default;
const {PROD_H5_WEB_CONTEXT} = require("./WebpackConfig");

config.plugins.unshift(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"prod"',
            H5_WEB_CONTEXT: JSON.stringify(PROD_H5_WEB_CONTEXT)
        }
    })
);
// console.log(config.plugins)
module.exports = config;
