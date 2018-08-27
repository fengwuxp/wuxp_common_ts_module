

//需要导入的源码模块
const list = [
    //所有common_开头的模块
    "common_"
];

if (process.env._self !== "1") {
    const {INCLUDE_PATH} = require("../../../webpack-config/WebpackConfig");
    if (INCLUDE_PATH) {
        list.push(...INCLUDE_PATH);
    }
}


/**
 * loader是否忽略该文件
 * @param path 文件路径
 * @return {boolean} true 忽略 false 不忽略
 */
const isExclude = function (path) {

    //是否为node_modules中的模块
    let isNodeModules = path.indexOf("node_modules") >= 0;

    let isWxpComponents = list.some((item) => {
        return path.indexOf(item) >= 0;
    });

    if (isWxpComponents) {
        return false;
    }
    return isNodeModules;
};

module.export = isExclude;
