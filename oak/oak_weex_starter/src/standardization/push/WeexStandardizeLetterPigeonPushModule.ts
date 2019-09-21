import {standardizedWeexModuleToPromise} from "fengwuxp_common_weex/src/sdk/standardization/StandardizationHelper";
import {msgPush} from "../../ExpotrtWeexOAKModel";
import {getStandardizedPushModuleOptions, WeexStandardizedPushModule} from "./WeexStandardizedPushModule";


/**
 * 信鸽推送能力标准化
 */
export interface WeexStandardizeLetterPigeonPushModule extends WeexStandardizedPushModule {


}


const standardizeLetterPigeonPushModule = standardizedWeexModuleToPromise<WeexStandardizeLetterPigeonPushModule>(getStandardizedPushModuleOptions(msgPush));

export default standardizeLetterPigeonPushModule;
