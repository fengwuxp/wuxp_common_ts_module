import {FeignOptions} from "../annotations/Feign";
import {defaultApiModuleName} from "../constant/FeignConstVar";


;

export const getApiModuleName = (feignOptions: FeignOptions) => {

    if (feignOptions == null) {
        return defaultApiModuleName;
    }

    return feignOptions.apiModule ? feignOptions.apiModule : defaultApiModuleName;
};