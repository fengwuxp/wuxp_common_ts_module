import AppConfigRegistry from "common_config/src/app/AppConfigRegistry";
import * as path from "path";


//获取app的配置的信息
const {resourceDomain, resourceConfig, httpProtocol} = AppConfigRegistry.get();

const {iosProjectName, remoteDeploymentDirectory, versionCode} = resourceConfig;

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


    const isAndroidAssets = bundleUrl.indexOf(ANDROID_JS_DIR) >= 0;
    const isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf(iosProjectName) > 0;

    let nativeBase: string;
    if (isAndroidAssets) {
        nativeBase = ANDROID_JS_DIR;
    } else if (isiOSAssets) {
        nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf(`${iosProjectName}/`)) + `${iosProjectName}/${IOS_JS_DIR}/`;
    } else {

        //远程js加入版本控制
        const host = `${resourceDomain}/${WEB_JS_DIR}/${remoteDeploymentDirectory}/${versionCode ? '' : '/v_' + versionCode}/`;
        nativeBase = `${httpProtocol}://` + host;
    }

    return nativeBase;
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

    return path.resolve(WEEX_BUNDLE_JS_BASE_PATH, uri);
};
