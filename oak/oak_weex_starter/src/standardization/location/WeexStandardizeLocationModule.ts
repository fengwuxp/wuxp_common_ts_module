import {WeexStandardizedModule} from "fengwuxp_common_weex/src/sdk/standardization/WeexStandardizedModule";
import {standardizedWeexModuleToPromise} from "fengwuxp_common_weex/src/sdk/standardization/StandardizationHelper";
import {LocationResult, RouteOptions} from "../../module/location";
import {location} from "../../ExpotrtWeexOAKModel"

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

    categoryList?: string[]

    keywords?: string[];

    options?: {};
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
            const categoryList = options.categoryList;
            const keywords = options.keywords;
            return [
                categoryList == null ? null : categoryList.join(" "),
                keywords == null ? null : keywords.join(" "),
                options.options || {}
            ];
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
