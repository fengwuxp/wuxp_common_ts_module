import {WeexModule} from "weex";
import {WeexBoradcastModule} from "./module/broadcast";
import {LocationModule, NaviMapModule} from "./module/location";
import {AliPayModule} from "./module/pay";



const broadcast: WeexBoradcastModule = weex.requireModule("broadcast");  //自定义广播对象
const cache: any = weex.requireModule("cache");
const appMain: any = weex.requireModule("appMain");
const imageLoader: any = weex.requireModule("image");
const msgPush: any = weex.requireModule("msgPush");
const qrcode: any = weex.requireModule("qrcode");
const common: any = weex.requireModule("common");
const appUpdate: any = weex.requireModule("appUpdate");
const photo: any = weex.requireModule("photo");
const location: LocationModule = weex.requireModule("location");
const thirdLogin: any = weex.requireModule("thirdLogin");
const aliPay: AliPayModule = weex.requireModule("aliPay");
const naviMap: NaviMapModule = weex.requireModule("naviMap");

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
    naviMap
}
