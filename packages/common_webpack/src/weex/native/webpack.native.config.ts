const webpack = require('webpack');
const {config} = require('./GetNativeBaseConfig.js');
// const {DEV_API_ADDRESS,TEST_H5_WEB_CONTEXT} = require("../../../webpack-config/WebpackConfig");

const bannerPlugin = new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true
});
if (config.plugins == null) {
    config.plugins = [];
}
config.plugins.push(bannerPlugin);

export default  config;
