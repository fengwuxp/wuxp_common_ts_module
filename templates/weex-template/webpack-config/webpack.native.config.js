const webpack = require('webpack');
const config = require("common_webpack/lib/weex/native/webpack.native.config").default;

const {DEV_API_ADDRESS, TEST_H5_WEB_CONTEXT} = require("./WebpackConfig");

config.plugins.unshift(new webpack.DefinePlugin({
    'process.env': {
        IS_WEB: false,
        NODE_ENV: '"dev"',
        API_ROOT: JSON.stringify(DEV_API_ADDRESS),
        H5_WEB_CONTEXT: JSON.stringify(TEST_H5_WEB_CONTEXT)
    }
}));

module.exports = config;
