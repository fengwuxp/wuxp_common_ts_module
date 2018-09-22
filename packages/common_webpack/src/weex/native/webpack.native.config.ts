import * as webpack from "webpack";

import config from "./webpack.native.base.config";



const bannerPlugin = new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" }\n',
    raw: true
});
if (config.plugins == null) {
    config.plugins = [];
}
config.mode="development";

config.plugins.push(bannerPlugin);

export default  config;
