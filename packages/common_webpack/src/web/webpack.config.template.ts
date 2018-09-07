import * as path from "path";

import {getWebpackBaseConfig} from "./webpack.base.config";


const baseConfig = getWebpackBaseConfig({
    themePath: path.resolve("theme", "index.json")
});
const config = {
    ...baseConfig
};


config.plugins = [
    ...config.plugins,
];
config.mode = "development";

export default config;
