/**
 * 自定义weex模块，需要h5 android ios分别做实现
 */

export const registerWeexModuleByWeb = () => {
    require("./module/boradcast/Broadcast");
    require("./module/Cache");
    require("./module/AppMain");
    require("./module/ImageLoad");
    require("./module/push/MessagagePush");
    require("./module/scan/Qrcode");
    require("./module/Common");
    require("./module/version/AppUpdate");
    require("./module/Photo");
    require("./module/location/Location");
    require("./module/third/ThirdLogin");
    require("./module/pay/ALiPayModule");
    require("./module/location/NaviMapModule");
};