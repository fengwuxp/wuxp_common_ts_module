/**
 * webpack配置
 * @author wxup
 * @create 2018-09-08 0:14
 **/
function getWebpackConfig(): CustomizeWebpackConfig {
    if (process.env._self !== "1") {
        return require("../../../../webpack-config/WebpackConfig");
    }
    return {} as CustomizeWebpackConfig;
}

interface CustomizeWebpackConfig {

    //部署目录
    DEPLOYMENT_DIRECTORY?: string;

    /**
     * 导入的目录或文件路径
     */
    INCLUDE_PATH?: string;

    /**
     * 项目目录
     */
    PROJECT_DIR?: string;

    //排除打包的模块
    EXTERNALS: object;
}

export const {
    DEPLOYMENT_DIRECTORY,
    INCLUDE_PATH,
    PROJECT_DIR,
    EXTERNALS
} = getWebpackConfig();
