import {location} from "../../ExpotrtWeexOAKModel";
import {WeexStandardizedPlugin} from "common_weex/src/sdk/standardization/WeexStandardizedPlugin";
import {standardizedWeexModuleToPromise} from "../../../../../packages/common_weex/src/sdk/standardization/StandardizationHelper";
import {isIos} from "../../../../../packages/common_weex/src/constant/WeexEnv";

/**
 * 定位插件
 */
export interface LocationPlugin extends WeexStandardizedPlugin {

    /**
     * 定位
     * @param options
     */
    location: (options: LocationOptions) => Promise<LocationResult>;
}

interface LocationOptions {

    /**
     * 是否打开地图
     */
    openMap?: boolean;
}

interface LocationResult {
    /**
     * 街道
     */
    district: string;

    /**
     * 详细地址
     */
    address: string;

    /**
     * 第三方城市编码
     */
    areaCode: string,

    /**
     * 纬度
     */
    latitude: number;


    /**
     * 经度
     */
    longitude: number;
}

/**
 * 定位插件
 */
export const locationPlugin: LocationPlugin = {

    location: (options: LocationOptions): Promise<LocationResult> => {
        return standardizedWeexModuleToPromise({
            weexModule: location,
            transformParams: () => {
                const openMap = options.openMap || false;
                return [isIos ? (openMap ? 1 : 0) : openMap];
            },
            transformCallback: (resolve, reject) => [
                resolve,
                reject
            ]
        });
    }


};