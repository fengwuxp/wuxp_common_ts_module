import {WeexModule} from "weex";


/**
 * 广播模块
 */
export interface WeexBoradcastModule extends WeexModule {

    register: (category: string,
               eventName: string,
               succFn: (data) => void,
               errorFn?: (data) => void,) => void;

    send: (category: string,
           eventName: string,
           data,
           error?) => void;

    unregister: (category: string, eventName: string) => void;
}

const broadcast: WeexBoradcastModule = weex.requireModule("broadcast");  //自定义广播对象
const cache: any = weex.requireModule("cache");
const appMain: any = weex.requireModule("appMain");
const imageLoader: any = weex.requireModule("image");
const msgPush: any = weex.requireModule("msgPush");
const qrcode: any = weex.requireModule("qrcode");
const common: any = weex.requireModule("common");
const appUpdate: any = weex.requireModule("appUpdate");
const photo: any = weex.requireModule("photo");
const location: any = weex.requireModule("location");
const thirdLogin: any = weex.requireModule("thirdLogin");
const aliPay: any = weex.requireModule("aliPay");

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
    thirdLogin
}
