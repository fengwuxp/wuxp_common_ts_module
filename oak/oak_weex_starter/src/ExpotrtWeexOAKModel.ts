import {WeexModule} from "weex";
import {WeexBoradcastModule} from "./module/broadcast";
import {LocationModule, NaviMapModule} from "./module/location";
import {ALiPayModule, WexXinPayModule} from "./module/pay";
import {ThirdLoginModule} from "./module/third";
import {WeexAppVersionControlModule} from "./module/version";
import {WeexLetterPigeonPushModule} from "./module/push";
import {WeexKeyboardModule} from "./module/keyboard";


const broadcast: WeexBoradcastModule = weex.requireModule("broadcast");  //自定义广播对象
const cache: any = weex.requireModule("cache");
const appMain: any = weex.requireModule("appMain");
const imageLoader: any = weex.requireModule("image");
const msgPush: WeexLetterPigeonPushModule = weex.requireModule("msgPush");
const qrcode: any = weex.requireModule("qrcode");
const common: any = weex.requireModule("common");
const appUpdate: WeexAppVersionControlModule = weex.requireModule("appUpdate");
const photo: any = weex.requireModule("photo");
const location: LocationModule = weex.requireModule("location");
const thirdLogin: ThirdLoginModule = weex.requireModule("thirdLogin");
const aliPay: ALiPayModule = weex.requireModule("aliPay");
const weixinPay: WexXinPayModule = weex.requireModule("weixinPay");
const naviMap: NaviMapModule = weex.requireModule("naviMap");
const keyBoard: WeexKeyboardModule = weex.requireModule("keyBoard");

//此处为了导入地方能够进行结构赋值，不能使用 export default

export {
    broadcast,
    cache,
    appMain,
    imageLoader,
    msgPush,
    qrcode,
    common,
    appUpdate,
    photo,
    location,
    thirdLogin,
    aliPay,
    weixinPay,
    naviMap,
    keyBoard
}
