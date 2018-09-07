import * as path from "path";

import {getWebpackBaseConfig} from "common_webpack/src/web/webpack.base.config";


const config = getWebpackBaseConfig({
    themePath: path.resolve("theme", "index.json")
});
const baseConfig = {
    ...config,
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        // "moment": "moment"
    },
};


baseConfig.plugins = [
    ...config.plugins,
];
baseConfig.mode = "development";

export {
    baseConfig
};
