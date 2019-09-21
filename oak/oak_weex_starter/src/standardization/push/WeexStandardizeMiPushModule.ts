import {standardizedWeexModuleToPromise} from "fengwuxp_common_weex/src/sdk/standardization/StandardizationHelper";
import {WeexPushModule} from "../../module/push";
import {getStandardizedPushModuleOptions, WeexStandardizedPushModule} from "./WeexStandardizedPushModule";


/**
 * 小米推送能力标准化
 */
export interface WeexStandardizeMiPushModule extends WeexStandardizedPushModule {

}

const msgMiPush: WeexPushModule = weex.requireModule("msgMiPush");

const standardizeLetterPigeonPushModule = standardizedWeexModuleToPromise<WeexStandardizeMiPushModule>(getStandardizedPushModuleOptions(msgMiPush));

export default standardizeLetterPigeonPushModule;
