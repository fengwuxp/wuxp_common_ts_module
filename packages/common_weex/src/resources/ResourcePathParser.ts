import AppConfigRegistry from "common_config/src/app/AppConfigRegistry";
import * as path from "path";


const pathPrefix = {

    web: "",

    android: "file://",

    ios: "file:///"
};

//bundleURL
const bundleUrl: string = weex.config.bundleUrl;

//android js 目录
const ANDROID_JS_DIR = process.env.ANDROID_JS_DIR || 'file://assets/';

//ios js 目录
const IOS_JS_DIR = process.env.IOS_JS_DIR || 'bundlejs';

//web 远程js目录
const WEB_JS_DIR = process.env.WEB_JS_DIR || 'weex';

/**
 * 路径解析，获取bundle js的根路径
 * @author wxup
 * @create 2018-09-27 9:54
 **/
export const parseWeexBundleJsBasePath = () => {

    //获取app的配置的信息
    const {staticResourcesRootPath, resourceConfig, httpProtocol} = AppConfigRegistry.get();

    const {iosProjectName, remoteDeploymentDirectory, versionCode} = resourceConfig;


    const isAndroidAssets = bundleUrl.indexOf(ANDROID_JS_DIR) >= 0;
    const isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf(iosProjectName) > 0;

    let nativeBasePaht: string;
    if (isAndroidAssets) {
        nativeBasePaht = ANDROID_JS_DIR;
    } else if (isiOSAssets) {
        nativeBasePaht = bundleUrl.substring(0, bundleUrl.lastIndexOf(`${iosProjectName}/`)) + `${iosProjectName}/${IOS_JS_DIR}/`;
    } else {
        //远程js加入版本控制
        const host = `${staticResourcesRootPath}/${WEB_JS_DIR}/${remoteDeploymentDirectory}/${!!versionCode ? 'v_' + versionCode + '/' : ''}`;
        nativeBasePaht = `${host}`;

    }

    return nativeBasePaht;
};

/**
 * weex bundle js base path
 */
export const WEEX_BUNDLE_JS_BASE_PATH = parseWeexBundleJsBasePath();

/**
 * 获取资源的完整路径
 * @param uri
 */
export const getWeexResourceUrl = (uri: string) => {
    let prefix = "";
    if (bundleUrl.startsWith("http")) {
        //远程
        prefix = "http://";
    } else {
        prefix = pathPrefix[weex.config.env.platform.toLowerCase()];
    }
    return prefix + path.join(WEEX_BUNDLE_JS_BASE_PATH.replace(prefix, ""), uri);
};
