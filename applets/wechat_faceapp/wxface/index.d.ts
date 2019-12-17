import {
    CheckWxFacePayOsInfoError,
    CheckWxFacePayOsInfoResult,
    launchMpError,
    launchMpParam,
    WeChatAppletsTemplateMethod,
    WriteToSerialPortError,
    WriteToSerialPortParam,
    WriteToSerialPortResult
} from "./wxface";

declare global {

    namespace wxfaceapp {


        /**
         * @link https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_3-1-%E8%8E%B7%E5%8F%96%E7%B3%BB%E7%BB%9F%E4%BF%A1%E6%81%AF-checkwxfacepayosinfo
         * 获取系统信息 - checkWxFacePayOsInfo
         */
        const checkWxFacePayOsInfo: WeChatAppletsTemplateMethod<CheckWxFacePayOsInfoResult, CheckWxFacePayOsInfoError>;


        /**
         * @link https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_3-2-%E6%95%B0%E6%8D%AE%E5%86%99%E4%B8%B2%E5%8F%A3-writetoserialport
         *数据写串口 - writeToSerialPort
         */
        const writeToSerialPort: WeChatAppletsTemplateMethod<WriteToSerialPortResult, WriteToSerialPortError, WriteToSerialPortParam>;


        /**
         * @link https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_3-3-%E5%90%AF%E5%8A%A8%E5%B0%8F%E7%A8%8B%E5%BA%8F-launchmp
         * 启动小程序 - launchMp
         */
        const launchMp: WeChatAppletsTemplateMethod<launchMpError, launchMpError, launchMpParam>
    }
}
