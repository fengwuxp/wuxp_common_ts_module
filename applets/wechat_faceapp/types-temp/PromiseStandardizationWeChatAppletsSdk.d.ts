import { CheckWxFacePayOsInfoError, CheckWxFacePayOsInfoResult, LaunchMpResult, LaunchMpParam, WriteToSerialPortError, WriteToSerialPortParam, WriteToSerialPortResult } from "../wxface/wxface";
declare type WeChatAppletsPromiseTemplateMethod<P = any, S = any, E = any> = (param: P) => Promise<S>;
export interface PromiseStandardizationWeChatAppletsSdk {
    checkWxFacePayOsInfo: WeChatAppletsPromiseTemplateMethod<void, CheckWxFacePayOsInfoResult, CheckWxFacePayOsInfoError>;
    writeToSerialPort: WeChatAppletsPromiseTemplateMethod<WriteToSerialPortParam, WriteToSerialPortResult, WriteToSerialPortError>;
    launchMp: WeChatAppletsPromiseTemplateMethod<LaunchMpParam, LaunchMpResult, LaunchMpResult>;
    exitMp: WeChatAppletsPromiseTemplateMethod<void, void, void>;
}
declare const WeChatAppletsSdk: PromiseStandardizationWeChatAppletsSdk;
export default WeChatAppletsSdk;
