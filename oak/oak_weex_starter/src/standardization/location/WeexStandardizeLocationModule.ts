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

    /**
     * 选择位置
     */
    readonly chooseLocation: (options: ChooseLocationOptions) => Promise<LocationResult>;
}

interface ChooseLocationOptions {
    search: string
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

const defaultOptions: LocationOptions = {forceLocation: false};

const standardizeLocationModule: WeexStandardizeLocationModule = standardizedWeexModuleToPromise<WeexStandardizeLocationModule>({
    module: location,
    transformParamMap: {
        chooseLocation: (options: ChooseLocationOptions) => {
            return [options.search];
        }
    },
    transformCallbackMap: {},
    enhanceMap: {
        getCurrentLocation(weexStandardizedModule: WeexStandardizedModule, options: LocationOptions = defaultOptions) {
            return new Promise<LocationResult>((resolve, reject) => {
                const forceLocation = defaultOptions.forceLocation || false;
                location.getMyLocation(forceLocation ? 1 : 0, resolve);
            })
        }
    }
});

/**
 * 标准化的定位模块
 */
export default standardizeLocationModule;
