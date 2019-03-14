import {LetterPigeonConfigOptions, WeexLetterPigeonPushModule} from "../../module/push";
import {standardizedWeexModuleToPromise} from "common_weex/src/sdk/standardization/StandardizationHelper";
import {msgPush} from "../../ExpotrtWeexOAKModel";

/**
 * 信鸽推送能力标准化
 */
export interface WeexStandardizeLetterPigeonPushModule {


    /**
     * 配置信鸽推送的参数
     * @param config
     */
    config: (config: LetterPigeonConfigOptions) => void;
}

const standardizeLetterPigeonPushModule = standardizedWeexModuleToPromise<WeexStandardizeLetterPigeonPushModule>({
    module: msgPush,
    transformParamMap: {
        config: (pigeonConfigOptions: LetterPigeonConfigOptions) => {
            return [
                pigeonConfigOptions
            ];
        }

    },
    transformCallbackMap: {}

});

export default standardizeLetterPigeonPushModule