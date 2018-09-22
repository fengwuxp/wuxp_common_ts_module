/**
 * weex 打包的一些配置
 * @author wxup
 * @create 2018-09-22 14:53
 **/
let { NATIVE_EXCLUDE_FILES, ANDROID_DIR, IOS_DIR, IMAGE_PATH } = require("../../../webpack-config/WebpackConfig");
if (NATIVE_EXCLUDE_FILES === undefined || NATIVE_EXCLUDE_FILES === null) {
    NATIVE_EXCLUDE_FILES = [];
}
//默认安卓输出目录
const DEFAULT_ANDROID_DIR = "./app/android/app/src/main/assets/js";
//默认ios输出目录
const DEFAULT_IOS_DIR = "./app/ios/bundlejs";
ANDROID_DIR = ANDROID_DIR ? ANDROID_DIR : DEFAULT_ANDROID_DIR;
IOS_DIR = IOS_DIR ? IOS_DIR : DEFAULT_IOS_DIR;
IMAGE_PATH = IMAGE_PATH ? IMAGE_PATH : "./images";
const PackConfig = {
    NATIVE_EXCLUDE_FILES,
    ANDROID_DIR,
    IOS_DIR,
    IMAGE_PATH
};
export default PackConfig;
