import config from "./antd.webpack.config.template";
import {externals} from "./WebpackExternals";
import {uglifyJsPlugin} from "../plugins/UglifyJsPluginConfig";

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const prodConfig = {
    ...config,
    externals
};

prodConfig.mode = "production";
prodConfig.devtool = false;

prodConfig.optimization = { // 提取js 第三方库等
    splitChunks: {
        cacheGroups: {
            common: {
                chunks: 'initial', // 必须三选一： "initial"(初始化) | "all" | "async"(默认就是异步)
                name: 'common',    // entry中js
                enforce: true,      // 强制
                test: /node_modules/,     // 正则规则验证，如果符合就提取 chunk
                minSize: 0,
                minChunks: 1,
                reuseExistingChunk: true   // 可设置是否重用已用chunk 不再创建新的chunk
            }
        }
    },
    concatenateModules: true
};

prodConfig.plugins.push(
    uglifyJsPlugin,
    new BundleAnalyzerPlugin()
);

export default prodConfig;
