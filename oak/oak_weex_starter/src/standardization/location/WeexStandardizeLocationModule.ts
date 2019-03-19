import {WeexStandardizedModule} from "common_weex/src/sdk/standardization/WeexStandardizedModule";
import {standardizedWeexModuleToPromise} from "common_weex/src/sdk/standardization/StandardizationHelper";
import {LocationModule, LocationResult, RouteOptions} from "../../module/location";
import {location, appMain} from "../../ExpotrtWeexOAKModel"

/**
 * 定位插件
 */
export interface WeexStandardizeLocationModule extends WeexStandardizedModule {

    /**
     * 获取当前位置
     * @param options
     */
    readonly getCurrentLocation: (options?: LocationOptions) => Promise<LocationResult>;

    /**
     * 打开路线面板
     * @param options
     */
    readonly openRoutePlan: (options: RouteOptions) => Promise<void>;

    /**
     * 打开选择小区面板
     */
    readonly chooseCommunity: () => Promise<LocationResult>;
}

interface LocationOptions {

    /**
     * 是否打开地图
     * 默认 false
     */
    // openMap?: boolean;

    /**
     * 是否强制重新定位
     * 默认 false
     */
    forceLocation?: boolean;
}

const defaultOptions: LocationOptions = {openMap: false, forceLocation: false};

const standardizeLocationModule: WeexStandardizeLocationModule = standardizedWeexModuleToPromise<WeexStandardizeLocationModule>({
    module: location,
    transformParamMap: {},
    transformCallbackMap: {},
    enhanceMap: {
        getCurrentLocation(weexStandardizedModule: WeexStandardizedModule, options: LocationOptions = defaultOptions) {
            const openMap = options.openMap || false;

            return new Promise<LocationResult>((resolve, reject) => {
                // const forceLocation = defaultOptions.forceLocation || false;
                (weexStandardizedModule as LocationModule).getMyLocation(openMap ? 1 : 0, resolve);
            })
        }


    }
});

/**
 * 标准化的定位模块
 */
export default standardizeLocationModule;
