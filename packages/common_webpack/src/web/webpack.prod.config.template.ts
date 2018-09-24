import * as path from "path";
import {getWebpackBaseConfig} from "./webpack.base.config"
import {uglifyJsPlugin} from "../plugins/UglifyJsPluginConfig";

const baseConfig = getWebpackBaseConfig({
    themePath: path.resolve("theme", "index.json")
});


const config = {
    ...baseConfig,
};

config.mode = "production";


config.optimization = { // 提取js 第三方库等
    splitChunks: {
        cacheGroups: {
            common: {
                chunks: 'initial', // 初始化
                name: 'common',    // entry中js
                enforce: true      // 强制
            }
        }
    }
};

config.plugins.push(
    uglifyJsPlugin
);

export default config;
