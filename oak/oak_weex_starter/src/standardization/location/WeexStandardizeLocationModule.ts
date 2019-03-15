import {WeexStandardizedModule} from "common_weex/src/sdk/standardization/WeexStandardizedModule";
import {standardizedWeexModuleToPromise} from "common_weex/src/sdk/standardization/StandardizationHelper";
import {LocationResult, RouteOptions} from "../../module/location";
import {location} from "../../ExpotrtWeexOAKModel"

/**
 * 定位插件
 */
export interface WeexStandardizeLocationModule extends WeexStandardizedModule {

    /**
     * 定位
     * @param options
     */
    readonly getMyLocation: (options?: LocationOptions) => Promise<LocationResult>;

    /**
     * 打开路线面板
     * @param options
     */
    readonly openRoutePlan: (options: RouteOptions) => Promise<void>;
}

interface LocationOptions {

    /**
     * 是否打开地图
     */
    openMap?: boolean;
}

const standardizeLocationModule: WeexStandardizeLocationModule = standardizedWeexModuleToPromise<WeexStandardizeLocationModule>({
    module: location,
    transformParamMap: {
        getMyLocation: (options: LocationOptions = {openMap: false}) => {
            const openMap = options.openMap || false;
            return [openMap ? 1 : 0];
        }
    },
    transformCallbackMap:{},
    enhanceMap: {

    }
});

/**
 * 标准化的定位模块
 */
export default standardizeLocationModule;
