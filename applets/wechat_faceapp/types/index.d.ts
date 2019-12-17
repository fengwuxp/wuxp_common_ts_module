interface BaseParam<R = any, E = Error> {

    success?: (res: R) => void;

    fail?: (error: E) => void;
}

interface CheckWxFacePayOsInfoResult {
    // 参数	类型	说明
    //该青蛙机具的Android系统版本
    osVersion: string
    //	青蛙机具与人脸App状态，成功回调返回"valid"
    osStatus: "valid" | string;
    //该青蛙机具的设备号
    osSerialNumber: string;
}

interface CheckWxFacePayOsInfoError{
    osErrorMsg: string
}


interface WriteToSerialPortParam extends BaseParam<WriteToSerialPortResult, WriteToSerialPortError> {
    //开发者需要通过串口传入POS机的信息
    msgToFlush: string;
}

interface WriteToSerialPortResult {
    // 返回码，返回"0"表示转文字并且播放成功
    replyCode: string;
    // 返回信息，成功回调返回"success"
    reply: string;
    // 成功写入串口的信息
    flushedMsg: string;
}

interface WriteToSerialPortError {
    // 参数	类型	说明
    // 返回码，返回"-1"表示写串口失败
    replyCode: string;
    // 错误具体信息
    reply: string;

}

interface launchMpParam extends BaseParam<launchMpError, launchMpError> {
    // 需要启动的后屏小程序的AppId
    appId: string;
    // 需要启动的后屏小程序的主体ID
    hostAppId: string;
    // 小程序的版本信息{0:正式版;1:开发版;2:体验版}
    miniappType: 0 | 1 | 2;
    // 小程序的启动页面
    launchPage: string;
    //是否需要登录态{0:不需要;1:需要}
    needLogin: string;
}

interface launchMpError {
    //具体返回码见下表
    // "-1"	后屏小程序正在启动,请勿重复启动
    // "-2"	青蛙小程序内部错误
    // "-3"	人脸支付已经在运行
    // "-4"	小程序参数设置有误
    // "-5"	当前机具不支持此功能
    // "-6"	机具不支持此功能
    replyCode: "0" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6";
    //错误具体信息
    reply: string;
}

declare type WeChatAppletsPromiseTemplateMethod<P = any, S = any, E = any> = (param: P) => Promise<S>;
interface PromiseStandardizationWeChatAppletsSdk {
    checkWxFacePayOsInfo: WeChatAppletsPromiseTemplateMethod<void, CheckWxFacePayOsInfoResult, CheckWxFacePayOsInfoError>;
    writeToSerialPort: WeChatAppletsPromiseTemplateMethod<WriteToSerialPortParam, WriteToSerialPortResult, WriteToSerialPortError>;
    launchMp: WeChatAppletsPromiseTemplateMethod<launchMpParam, launchMpError, launchMpError>;
}
declare const WeChatAppletsSdk: PromiseStandardizationWeChatAppletsSdk;

export { WeChatAppletsSdk };
