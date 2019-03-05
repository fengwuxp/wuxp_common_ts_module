import {WeexStandardizedModule} from "common_weex/src/sdk/standardization/WeexStandardizedModule";
import {standardizedWeexModuleToPromise} from "common_weex/src/sdk/standardization/StandardizationHelper";
import {LocationResult} from "../../module/location";
import {location} from "../../ExpotrtWeexOAKModel"

/**
 * 定位插件
 */
export interface WeexStandardizeLocationModule extends WeexStandardizedModule {

    /**
     * 定位
     * @param options
     */
    readonly location: (options?: LocationOptions) => Promise<LocationResult>;

    /**
     * 打开路线面板
     * @param options
     */
    readonly openRoutePlan: (options: OpenRoutePlanOptions) => Promise<{}>;
}

interface LocationOptions {

    /**
     * 是否打开地图
     */
    openMap?: boolean;
}

interface OpenRoutePlanOptions {

}

/**
 * 标准化的定位模块
 */
export default standardizedWeexModuleToPromise<WeexStandardizeLocationModule>({
    module: location,
    transformParamMap: {
        location: (options: LocationOptions = {openMap: false}) => {
            const openMap = options.openMap || false;
            return [openMap ? 1 : 0];
        }
    },
    transformCallback: (resolve, reject) => [
        resolve,
        reject
    ]
});
