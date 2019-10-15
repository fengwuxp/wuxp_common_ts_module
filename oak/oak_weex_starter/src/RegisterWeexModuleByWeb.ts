/**
 * 注册（导入）自定义weex模块
 */
export const registerWeexModuleByWeb = () => {
    require("./module/broadcast/Broadcast");
    require("./module/push/WeexLetterPigeonPushModule");
    require("./module/scan/Qrcode");
    require("./module/version/AppUpdate");
    require("./module/location/Location");
    require("./module/location/NaviMapModule");
    require("./module/third/ThirdLogin");
    require("./module/pay/ALiPayModule");
    require("./module/picker/DateTimerPickerModule");
    require("./module/share/ShareModel");
    require("./module/keyboard/KeyboardModule");
    require("./module/push/WeexLetterPigeonPushModule");
    require("./module/push/WeexMiPushModule");

    require("./module/Cache");
    require("./module/AppMain");
    require("./module/ImageLoad");
    require("./module/Common");
    require("./module/Photo");


    require("./natjs/network/web/");
    require("./natjs/media/web/AudioWebModule");
    require("./natjs/media/web/VideoWebModule");


};
