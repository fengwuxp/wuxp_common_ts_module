import {newProxyInstance} from "fengwuxp-common-proxy";
import {
    CheckWxFacePayOsInfoError,
    CheckWxFacePayOsInfoResult,
    LaunchMpResult,
    LaunchMpParam,
    WriteToSerialPortError,
    WriteToSerialPortParam,
    WriteToSerialPortResult,
    PostMsgParam,
    PostMsgResult,
    OnRemoteMessageResult,
    RegistKeyBoardParam,
    RegistKeyBoardResult,
    OnKeyBoardEventResult,
    FacePayParam,
    FacePayResult,
    OnFacePayPassEventResult,
    OnFacePayFailedEventResult,
    FaceLoginParam,
    FaceLoginResult,
    OnCodePayEventResult,
    AbleToQuickPayParam,
    AbleToQuickPayResult,
    OnQueryPaymentFailedEventResult,
    OnQueryPaymentSucEventResult,
    OnSpecialCtrlEventResult,
    QuickPayParam,
    QuickPayResult,
    GetLastPayResultParam,
    GetLastPayResultResult,
    ListenCodePaymentParam,
    ListenCodePaymentResult
} from "../wxface/wxface";

type WeChatAppletsPromiseTemplateMethod<P = any, S = any, E = any> = (param: P) => Promise<S>;

type WeChatAppletsOnEventTemplateMethod<R = any> = (listener: (result: R) => void) => void;


export interface PromiseStandardizationWeChatAppletsSdk {

    checkWxFacePayOsInfo: WeChatAppletsPromiseTemplateMethod<void, CheckWxFacePayOsInfoResult, CheckWxFacePayOsInfoError>;

    writeToSerialPort: WeChatAppletsPromiseTemplateMethod<WriteToSerialPortParam, WriteToSerialPortResult, WriteToSerialPortError>;

    launchMp: WeChatAppletsPromiseTemplateMethod<LaunchMpParam, LaunchMpResult, LaunchMpResult>;

    exitMp: WeChatAppletsPromiseTemplateMethod<void, void, void>;

    postMsg: WeChatAppletsPromiseTemplateMethod<PostMsgParam, PostMsgResult, PostMsgResult>;


    registKeyBoard: WeChatAppletsPromiseTemplateMethod<RegistKeyBoardParam, RegistKeyBoardResult, RegistKeyBoardResult>;

    facePay: WeChatAppletsPromiseTemplateMethod<FacePayParam, FacePayResult, FacePayResult>;

    quickPay: WeChatAppletsPromiseTemplateMethod<QuickPayParam, QuickPayResult, QuickPayResult>;

    ableToQuickPay: WeChatAppletsPromiseTemplateMethod<AbleToQuickPayParam, AbleToQuickPayResult, AbleToQuickPayResult>;

    getLastPayResult: WeChatAppletsPromiseTemplateMethod<GetLastPayResultParam, GetLastPayResultResult, GetLastPayResultResult>;

    isLoginOnFaceApp: WeChatAppletsPromiseTemplateMethod<void, void, void>;

    faceLogin: WeChatAppletsPromiseTemplateMethod<FaceLoginParam, FaceLoginResult, FaceLoginResult>;

    listenCodePayment: WeChatAppletsPromiseTemplateMethod<ListenCodePaymentParam, ListenCodePaymentResult, ListenCodePaymentResult>;

    /*---------------------事件监听-------------*/

    onRemoteMessage: WeChatAppletsOnEventTemplateMethod<OnRemoteMessageResult>;

    onKeyBoardEvent: WeChatAppletsOnEventTemplateMethod<OnKeyBoardEventResult>;

    onFacePayPassEvent: WeChatAppletsOnEventTemplateMethod<OnFacePayPassEventResult>;

    onFacePayFailedEvent: WeChatAppletsOnEventTemplateMethod<OnFacePayFailedEventResult>;

    onQueryPaymentSucEvent: WeChatAppletsOnEventTemplateMethod<OnQueryPaymentSucEventResult>;

    onQueryPaymentFailedEvent: WeChatAppletsOnEventTemplateMethod<OnQueryPaymentFailedEventResult>;

    onCodePayEvent: WeChatAppletsOnEventTemplateMethod<OnCodePayEventResult>;

    onSpecialCtrlEvent: WeChatAppletsOnEventTemplateMethod<OnSpecialCtrlEventResult>;

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

    launchMp: (result: LaunchMpResult) => {
        return result.replyCode === SUCCESS_CODE;
    },


    postMsg: (result: PostMsgResult) => {
        return result.replyCode === SUCCESS_CODE;
    },

    registKeyBoard: (result: RegistKeyBoardResult) => {
        return result.replyCode === SUCCESS_CODE;
    },


    facePay: (result: FacePayResult) => {
        return result.replyCode === SUCCESS_CODE;
    },


    quickPay: (result: QuickPayResult) => {
        return result.replyCode === SUCCESS_CODE;
    },

    ableToQuickPay: (result: AbleToQuickPayResult) => {
        return result.replyCode === SUCCESS_CODE;
    },

    getLastPayResult: (result: GetLastPayResultResult) => {
        return result.replyCode === SUCCESS_CODE;
    },

    faceLogin: (result: FaceLoginResult) => {
        return result.replyCode === SUCCESS_CODE;
    }

};

// 单个callback的方法
// const singleCallbackFunctionNames = [
//     "onRemoteMessage",
//     "onSpecialCtrlEvent",
//     "onQueryPaymentFailedEvent",
//     "onFacePayFailedEvent",
//     "onQueryPaymentSucEvent",
//     "onKeyBoardEvent",
//     "onFacePayPassEvent",
//     "onCodePayEvent"
// ];

const WeChatAppletsSdk: PromiseStandardizationWeChatAppletsSdk = newProxyInstance(wxfaceapp as any, (target, propertyKey) => {

    return function <E = any, P = any>(param: P): Promise<E> {
        const condition = PromiseResolveCondition[propertyKey];
        // on 监听
        const isOnEventMonitor = (propertyKey as string).startsWith("on");
        if (isOnEventMonitor) {
            return wxfaceapp[propertyKey];
        }
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
