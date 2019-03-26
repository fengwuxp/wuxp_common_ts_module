/**
 * weex 打包的一些配置
 * @author wxup
 * @create 2018-09-22 14:53
 **/
import {getProjectRootDir} from "../../utils/WebpackUtils";

interface WeexPackConfig {
    /**
     * 原生排除打包的文件
     */
    NATIVE_EXCLUDE_FILES: string[];

    /**
     *  安卓存放js的文件目录
     */
    ANDROID_DIR: string;

    /**
     * ios存放js的文件目录
     */
    IOS_DIR: string;

    /**
     * 图片目录
     */
    IMAGE_PATH: string;

    /**
     * 字体文件目录
     */
    FONT_PATH: string;

    /**
     * 项目根目录
     */
    PROJECT_ROOT_DIR: string;
}

let {
    NATIVE_EXCLUDE_FILES,
    ANDROID_DIR,
    IOS_DIR,
    IMAGE_PATH,
    FONT_PATH
} = require("../../../../../webpack-config/WebpackConfig");


if (NATIVE_EXCLUDE_FILES === undefined || NATIVE_EXCLUDE_FILES === null) {
    NATIVE_EXCLUDE_FILES = [];
}

//默认安卓输出目录
const DEFAULT_ANDROID_DIR = "./app/android/app/src/main/assets/";

//默认ios输出目录
const DEFAULT_IOS_DIR = "./app/ios/bundlejs";


ANDROID_DIR = ANDROID_DIR || DEFAULT_ANDROID_DIR;

IOS_DIR = IOS_DIR || DEFAULT_IOS_DIR;

IMAGE_PATH = IMAGE_PATH || "./images";

FONT_PATH = FONT_PATH || "./fonts";

/**
 * 获取项目更目录
 */
const PROJECT_ROOT_DIR: string = getProjectRootDir();

// console.log("PROJECT_ROOT_DIR",PROJECT_ROOT_DIR)

const PackConfig: WeexPackConfig = {
    NATIVE_EXCLUDE_FILES,
    ANDROID_DIR,
    IOS_DIR,
    IMAGE_PATH,
    FONT_PATH,
    PROJECT_ROOT_DIR
};

export default PackConfig;
