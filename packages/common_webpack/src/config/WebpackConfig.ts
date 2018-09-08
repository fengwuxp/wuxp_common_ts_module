/**
 * 配置
 * @author wxup
 * @create 2018-09-08 0:14
 **/
function getWebpackConfig() {
    if (process.env._self !== "1") {
        return require("../../../../webpack-config/WebpackConfig");
    }
    return {};
}

export const {
    DEPLOYMENT_DIRECTORY,
    INCLUDE_PATH,
    PROJECT_DIR
} = getWebpackConfig();
