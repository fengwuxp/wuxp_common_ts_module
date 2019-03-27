import AppConfigRegistry from "common_config/src/app/AppConfigRegistry";
import * as path from "path";
import {isIos, isWeb} from "../constant/WeexEnv";


const PATH_PREFIX = {

    web: "",

    android: "file://",

    ios: "file:///"
};


//bundleURL
const bundleUrl: string = weex.config.bundleUrl;

//ios 资源目录
const IOS_RESOURCES_BASE_DIR = process.env.IOS_RESOURCES_BASE_DIR || 'bundlejs';

//android 资源目录
const ANDROID_RESOURCES_BASE_DIR = process.env.ANDROID_RESOURCES_BASE_DIR || 'assets';


//BUNDLE js DIR
const BUNDLE_JS_DIR = process.env.BUNDLE_DIR || "weex";


//图片目录
const IMAGES_DIR = process.env.IMAGES_DIR || "images";

//字体图标目标
const FONTS_DIR = process.env.FONTS_DIR || "fonts";


/**
 * 路径解析，获取bundle js的根路径
 * @param forceRemote 强制使用远程地址
 * @author wxup
 * @create 2018-09-27 9:54
 **/
export const parseWeexBundleJsBasePath = (forceRemote: boolean = isWeb) => {

    //获取app的配置的信息 WeexAppConfig
    const {staticResourcesRootPath, resourceConfig} = AppConfigRegistry.get() as any;

    const {iosProjectName, remoteDeploymentDirectory, versionCode} = resourceConfig;

    let nativeBasePath: string = undefined;
    if (!forceRemote) {
        const isAndroidAssets = bundleUrl.indexOf(PATH_PREFIX.android) >= 0 && bundleUrl.indexOf(`/${BUNDLE_JS_DIR}/`) >= 0;
        const isiOSAssets = bundleUrl.indexOf(PATH_PREFIX.ios) >= 0 && bundleUrl.indexOf(iosProjectName) > 0;
        if (isAndroidAssets) {
            //获取安卓的base path形如  file://assets/
            nativeBasePath = bundleUrl.substring(0, bundleUrl.lastIndexOf(`/${BUNDLE_JS_DIR}/`));
        } else if (isiOSAssets) {
            //获取ios的base path形如
            nativeBasePath = bundleUrl.substring(0, bundleUrl.lastIndexOf(`${iosProjectName}/`)) + `${iosProjectName}/${IOS_RESOURCES_BASE_DIR}/`;
        }
    }
    if (nativeBasePath == null) {
        //远程js加入版本控制
        const host = `${staticResourcesRootPath}/${remoteDeploymentDirectory ? remoteDeploymentDirectory + '/' : ''}${!!versionCode ? 'v_' + versionCode + '/' : ''}`;
        nativeBasePath = `${host}`;
    }

    return nativeBasePath;
};

/**
 * weex bundle js base path
 */
let WEEX_BUNDLE_JS_BASE_PATH = "", WEEX_FONTS_BASE_PATH = "";

const IS_IMAGE_REGEXP = /(jpg|png|jpeg|gif)$/gi;

/**
 * 获取资源的完整路径
 * @param uri
 */
export const getWeexResourceUrl = (uri: string) => {

    const enabledLocal = !isWeb && (process.env.ENABLED_SUPPORT_LOCAL_RESOURCE || false);
    if (!enabledLocal || !IS_IMAGE_REGEXP.test(uri)) {
        //没有启用本地资源，或者不是图片资源
        return getWeexResourceUrlByFile(uri);
    }

    return getWeexResourceUrlByLocal(uri.replace(".", "@2x."));
};


/**
 * 获取文件资源
 * @param uri
 */
const getWeexResourceUrlByFile = (uri: string) => {
    let prefix = "", isFontFile = false;
    const platformName = weex.config.env.platform.toLowerCase();
    if (bundleUrl.startsWith("http")) {
        //远程
        prefix = "http://";
    } else {
        prefix = PATH_PREFIX[platformName];
    }
    const uris = uri.split("?");
    let _uri = uris[0];
    if (_uri.endsWith(".js")) {
        //是js ,默认放在weex目录下
        _uri = `${BUNDLE_JS_DIR}/${uri}`;
    } else if (/\.(png|jpg|jpeg|webp)$/i.test(uri)) {
        //是图片 默认放在images目录下

        //TODO 如果是prod 环境 切换到本地图片
        _uri = `${IMAGES_DIR}/${uri}`;
    } else {
        isFontFile = /\.(ttf)$/i.test(uri);
        if (isFontFile) {
            //字体文件 默认放在fons目录下
            _uri = `${FONTS_DIR}/${uri}`;
        }
    }

    let basePath: string = "";
    if (isFontFile) {
        //字体文件默认走远程
        if (WEEX_FONTS_BASE_PATH === "") {
            WEEX_FONTS_BASE_PATH = parseWeexBundleJsBasePath(true);
        }

        basePath = WEEX_FONTS_BASE_PATH;
        prefix = "http://";
    } else {
        if (WEEX_BUNDLE_JS_BASE_PATH === "") {
            WEEX_BUNDLE_JS_BASE_PATH = parseWeexBundleJsBasePath();
        }
        basePath = WEEX_BUNDLE_JS_BASE_PATH;
    }

    return prefix + path.join(basePath.replace(prefix, ""), _uri);
    //
    // if (WEEX_BUNDLE_JS_BASE_PATH === "") {
    //     WEEX_BUNDLE_JS_BASE_PATH = parseWeexBundleJsBasePath();
    // }
    // return prefix + path.join(WEEX_BUNDLE_JS_BASE_PATH.replace(prefix, ""), _uri);
};

/**
 * 从本地加载资源 目前仅支持图片
 * https://weex.apache.org/zh/guide/advanced/asset-path.html#schemes
 * @param uri
 */
const getWeexResourceUrlByLocal = (uri: string) => {
    const strings: string[] = uri.split("/");
    const fileName = strings.pop().split(".")[0];
    return `local:///${fileName}`;
};