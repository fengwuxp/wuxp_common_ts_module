import AppConfigRegistry from "common_config/src/AppConfigRegistry";

const {resourceDomain, resourceConfig} = AppConfigRegistry.get("");

const {iosProjectName, remoteDeploymentDirectory, versionCode} = resourceConfig;
/**
 * 路径解析，获取bundle js的根路径
 * @author wxup
 * @create 2018-09-27 9:54
 **/
const resolveWeexBundleJsBasePath = () => {

    const bundleUrl: string = weex.config.bundleUrl;
    const isAndroidAssets = bundleUrl.indexOf('file://assets/') >= 0;
    const isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf(iosProjectName) > 0;

    let nativeBase: string;
    if (isAndroidAssets) {
        nativeBase = 'file://assets/js/';
    } else if (isiOSAssets) {
        nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf(`${iosProjectName}/`)) + `${iosProjectName}/bundlejs/`;
    } else {

        //远程js加入版本控制
        const host = `${resourceDomain}/weex/${remoteDeploymentDirectory}/${versionCode ? '' : '/v_' + versionCode}/`;
        nativeBase = "http://" + host;
    }

    return nativeBase;
};