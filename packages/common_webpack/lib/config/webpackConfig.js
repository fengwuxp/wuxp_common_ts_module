"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
/**
 * webpack配置
 * @author wxup
 * @create 2018-09-08 0:14
 **/
function getWebpackConfig() {
    if (process.env._self !== "1") {
        return require("../../../../webpack-config/WebpackConfig");
    }
    return {};
}
exports.DEPLOYMENT_DIRECTORY = (_a = getWebpackConfig(), _a.DEPLOYMENT_DIRECTORY), exports.INCLUDE_PATH = _a.INCLUDE_PATH, exports.PROJECT_DIR = _a.PROJECT_DIR, exports.EXTERNALS = _a.EXTERNALS, exports.DLL_LIBS = _a.DLL_LIBS;
