"use strict";
/**
 * weex 打包的一些配置
 * @author wxup
 * @create 2018-09-22 14:53
 **/
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require("../../../webpack-config/WebpackConfig"), NATIVE_EXCLUDE_FILES = _a.NATIVE_EXCLUDE_FILES, ANDROID_DIR = _a.ANDROID_DIR, IOS_DIR = _a.IOS_DIR, IMAGE_PATH = _a.IMAGE_PATH;
if (NATIVE_EXCLUDE_FILES === undefined || NATIVE_EXCLUDE_FILES === null) {
    NATIVE_EXCLUDE_FILES = [];
}
//默认安卓输出目录
var DEFAULT_ANDROID_DIR = "./app/android/app/src/main/assets/js";
//默认ios输出目录
var DEFAULT_IOS_DIR = "./app/ios/bundlejs";
ANDROID_DIR = ANDROID_DIR ? ANDROID_DIR : DEFAULT_ANDROID_DIR;
IOS_DIR = IOS_DIR ? IOS_DIR : DEFAULT_IOS_DIR;
IMAGE_PATH = IMAGE_PATH ? IMAGE_PATH : "./images";
var PackConfig = {
    NATIVE_EXCLUDE_FILES: NATIVE_EXCLUDE_FILES,
    ANDROID_DIR: ANDROID_DIR,
    IOS_DIR: IOS_DIR,
    IMAGE_PATH: IMAGE_PATH
};
exports.default = PackConfig;
