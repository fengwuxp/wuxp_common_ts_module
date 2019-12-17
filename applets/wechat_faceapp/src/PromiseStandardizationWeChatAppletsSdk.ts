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
    OnRemoteMessageParam,
    OnRemoteMessageResult,
    RegistKeyBoardParam,
    RegistKeyBoardResult,
    OnKeyBoardEventParam,
    OnKeyBoardEventResult,
    FacePayParam,
    FacePayResult,
    OnFacePayPassEventParam,
    OnFacePayPassEventResult,
    OnFacePayFailedEventResult,
    OnFacePayFailedEventParam,
    FaceLoginParam,
    FaceLoginResult,
    OnCodePayEventParam,
    OnCodePayEventResult,
    AbleToQuickPayParam,
    AbleToQuickPayResult,
    OnQueryPaymentFailedEventParam,
    OnQueryPaymentFailedEventResult,
    OnQueryPaymentSucEventParam,
    OnQueryPaymentSucEventResult,
    OnSpecialCtrlEventParam,
    OnSpecialCtrlEventResult,
    QuickPayParam,
    QuickPayResult,
    GetLastPayResultParam,
    GetLastPayResultResult,
    ListenCodePaymentParam,
    ListenCodePaymentResult
} from "../wxface/wxface";

type WeChatAppletsPromiseTemplateMethod<P = any, S = any, E = any> = (param: P) => Promise<S>;

export interface PromiseStandardizationWeChatAppletsSdk {

    checkWxFacePayOsInfo: WeChatAppletsPromiseTemplateMethod<void, CheckWxFacePayOsInfoResult, CheckWxFacePayOsInfoError>;

    writeToSerialPort: WeChatAppletsPromiseTemplateMethod<WriteToSerialPortParam, WriteToSerialPortResult, WriteToSerialPortError>;

    launchMp: WeChatAppletsPromiseTemplateMethod<LaunchMpParam, LaunchMpResult, LaunchMpResult>;

    exitMp: WeChatAppletsPromiseTemplateMethod<void, void, void>;

    postMsg: WeChatAppletsPromiseTemplateMethod<PostMsgParam, PostMsgResult, PostMsgResult>;

    onRemoteMessage: WeChatAppletsPromiseTemplateMethod<OnRemoteMessageParam, OnRemoteMessageResult, OnRemoteMessageResult>;

    registKeyBoard: WeChatAppletsPromiseTemplateMethod<RegistKeyBoardParam, RegistKeyBoardResult, RegistKeyBoardResult>;

    onKeyBoardEvent: WeChatAppletsPromiseTemplateMethod<OnKeyBoardEventParam, OnKeyBoardEventResult, OnKeyBoardEventResult>;

    facePay: WeChatAppletsPromiseTemplateMethod<FacePayParam, FacePayResult, FacePayResult>;

    onFacePayPassEvent: WeChatAppletsPromiseTemplateMethod<OnFacePayPassEventParam, OnFacePayPassEventResult, OnFacePayPassEventResult>;

    onFacePayFailedEvent: WeChatAppletsPromiseTemplateMethod<OnFacePayFailedEventParam, OnFacePayFailedEventResult, OnFacePayFailedEventResult>;

    onQueryPaymentSucEvent: WeChatAppletsPromiseTemplateMethod<OnQueryPaymentSucEventParam, OnQueryPaymentSucEventResult, OnQueryPaymentSucEventResult>;

    onQueryPaymentFailedEvent: WeChatAppletsPromiseTemplateMethod<OnQueryPaymentFailedEventParam, OnQueryPaymentFailedEventResult, OnQueryPaymentFailedEventResult>;

    listenCodePayment: WeChatAppletsPromiseTemplateMethod<ListenCodePaymentParam, ListenCodePaymentResult, ListenCodePaymentResult>;

    onCodePayEvent: WeChatAppletsPromiseTemplateMethod<OnCodePayEventParam, OnCodePayEventResult, OnCodePayEventResult>;

    quickPay: WeChatAppletsPromiseTemplateMethod<QuickPayParam, QuickPayResult, QuickPayResult>;

    ableToQuickPay: WeChatAppletsPromiseTemplateMethod<AbleToQuickPayParam, AbleToQuickPayResult, AbleToQuickPayResult>;

    getLastPayResult: WeChatAppletsPromiseTemplateMethod<GetLastPayResultParam, GetLastPayResultResult, GetLastPayResultResult>;

    isLoginOnFaceApp: WeChatAppletsPromiseTemplateMethod<void, void, void>;

    faceLogin: WeChatAppletsPromiseTemplateMethod<FaceLoginParam, FaceLoginResult, FaceLoginResult>;

    onSpecialCtrlEvent: WeChatAppletsPromiseTemplateMethod<OnSpecialCtrlEventParam, OnSpecialCtrlEventResult, OnSpecialCtrlEventResult>;

}


type PromiseResolveConditionInterface = {
    [key in keyof PromiseStandardizationWeChatAppletsSdk]?: (result: any) => boolean;
}

const SUCCESS_CODE = "0";
const FACE_PAY_FAIL_SUCCESS_CODE = ["-1", "-6", "-7", "-8"];
const ON_QUERY_PAYMENT_FAILED_EVENT_SUCCESS_CODE = ["-1", "-6", "-10", "-11", "-12"];

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

    exitMp: () => {
        return true;
    },

    postMsg: (result: PostMsgResult) => {
        return result.replyCode === SUCCESS_CODE;
    },

    onRemoteMessage: () => {
        return true;
    },

    registKeyBoard: (result: RegistKeyBoardResult) => {
        return result.replyCode === SUCCESS_CODE;
    },

    onKeyBoardEvent: (result: OnKeyBoardEventResult) => {
        return result.keyName === SUCCESS_CODE;
    },

    facePay: (result: FacePayResult) => {
        return result.replyCode === SUCCESS_CODE;
    },

    onFacePayPassEvent: (result: OnFacePayPassEventResult) => {
        return result.replyCode === SUCCESS_CODE;
    },

    onFacePayFailedEvent: (result: OnFacePayFailedEventResult) => {
        return FACE_PAY_FAIL_SUCCESS_CODE.indexOf(result.replyCode) > -1
    },

    onQueryPaymentSucEvent: (result: OnQueryPaymentSucEventResult) => {
        return result.replyCode === SUCCESS_CODE;
    },

    onQueryPaymentFailedEvent: (result: OnQueryPaymentFailedEventResult) => {
        return ON_QUERY_PAYMENT_FAILED_EVENT_SUCCESS_CODE.indexOf(result.replyCode) > -1
    },

    listenCodePayment: () => {
        return true
    },

    onCodePayEvent: (result: OnCodePayEventResult) => {
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

    isLoginOnFaceApp: (result: GetLastPayResultResult) => {
        return true
    },

    faceLogin: (result: FaceLoginResult) => {
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
