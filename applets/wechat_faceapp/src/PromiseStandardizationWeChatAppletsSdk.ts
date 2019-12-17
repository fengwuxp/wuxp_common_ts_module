import {newProxyInstance} from "fengwuxp-common-proxy";
import {
    CheckWxFacePayOsInfoError,
    CheckWxFacePayOsInfoResult, launchMpResult, launchMpParam,
    WriteToSerialPortError, WriteToSerialPortParam,
    WriteToSerialPortResult
} from "../wxface/wxface";

type WeChatAppletsPromiseTemplateMethod<P = any, S = any, E = any> = (param: P) => Promise<S>;

export interface PromiseStandardizationWeChatAppletsSdk {

    checkWxFacePayOsInfo: WeChatAppletsPromiseTemplateMethod<void, CheckWxFacePayOsInfoResult, CheckWxFacePayOsInfoError>;

    writeToSerialPort: WeChatAppletsPromiseTemplateMethod<WriteToSerialPortParam, WriteToSerialPortResult, WriteToSerialPortError>;

    launchMp: WeChatAppletsPromiseTemplateMethod<launchMpParam, launchMpResult, launchMpResult>;

    exitMp: WeChatAppletsPromiseTemplateMethod<void, void, void>;

}


type PromiseResolveConditionInterface = {
    [key in keyof PromiseStandardizationWeChatAppletsSdk]?: (result: any) => boolean;
}

const SUCCESS_CODE = "0";

/**
 * 表示成功调用的条件
 */
const PromiseResolveCondition: PromiseResolveConditionInterface = {
    checkWxFacePayOsInfo: (result: CheckWxFacePayOsInfoResult) => {
        return result.osStatus === "valid";
    },

    writeToSerialPort: (result: WriteToSerialPortResult) => {
        return result.replyCode === SUCCESS_CODE;
    },

    launchMp: (result: launchMpResult) => {
        return result.replyCode === SUCCESS_CODE;
    }
};

const WeChatAppletsSdk: PromiseStandardizationWeChatAppletsSdk = newProxyInstance(wxfaceapp as any, (target, propertyKey) => {

    return function <E = any, P = any>(param: P): Promise<E> {
        const condition = PromiseResolveCondition[propertyKey];
        return new Promise<E>((resolve, reject) => {
            wxfaceapp[propertyKey]({
                ...param,
                success: condition ? (result) => {
                    if (condition(result)) {
                        resolve(result);
                    } else {
                        reject(result);
                    }
                } : resolve,
                fail: reject
            })
        })
    }
});

export default WeChatAppletsSdk;
