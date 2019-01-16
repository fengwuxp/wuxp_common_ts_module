/**
 * 自定义weex模块，需要h5 android ios分别做实现
 */

export const registerWeexModuleByWeb = () => {
    require("./module/Broadcast");
    require("./module/Cache");
    require("./module/AppMain");
    require("./module/ImageLoad");
    require("./module/MessagagePush");
    require("./module/Qrcode");
    require("./module/Common");
    require("./module/AppUpdate");
    require("./module/Photo");
    require("./module/Location");
    require("./module/ThirdLogin");
    require("./module/ALiPayModule");
    require("./module/NaviMapModule");
};