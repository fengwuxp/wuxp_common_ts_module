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

interface LaunchMpParam extends BaseParam<LaunchMpResult, LaunchMpResult> {
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

interface LaunchMpResult {
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

interface PostMsgParam extends BaseParam<PostMsgResult, PostMsgResult> {
    // 需要接受消息的小程序的AppId
    targetAppid: string;
    // 传递的消息内容
    content: string;
}

interface PostMsgResult {
    //具体返回码见下表
    // "-1"	后屏小程序正在启动,请勿重复启动
    // "-2"	接收端的小程序Appid不匹配
    // "-3"	字符数超出限制
    // "-4"	输入参数有误
    // "-5"	小程序运行状态有误,不支持消息接收和发送
    // "-6"	机具不支持此功能
    // "-7"	未知错误
    // "-8"	发送消息超时
    replyCode: "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8";
    //错误具体信息
    reply: string;
}

interface OnRemoteMessageParam extends BaseParam<OnRemoteMessageResult, OnRemoteMessageResult> {

}

interface OnRemoteMessageResult {
    // 发送本条消息的小程序Appid
    senderAppid: string;
    // 传递的消息内容
    content: string;
}

interface RegistKeyBoardParam extends BaseParam<RegistKeyBoardResult, RegistKeyBoardResult> {
    // 定义了需要监听的各个按键所对应的AndroidKeyCode，注意，此输入不可为空，数组中的某个子Item也不可为空
    keyCodeList: number[];
}

interface RegistKeyBoardResult {
    // 返回码，返回0表示成功，返回-1表示输入参数解析失败
    replyCode: '-1' | '0';
    // 返回信息，注册成功返回“Success register to listen keyboard event”
    reply: string;
}

interface OnKeyBoardEventParam extends BaseParam<OnKeyBoardEventResult, OnKeyBoardEventResult> {
    // 定义了需要监听的各个按键所对应的AndroidKeyCode，注意，此输入不可为空，数组中的某个子Item也不可为空
    keyCodeList: number[];
}

interface OnKeyBoardEventResult {
    // 返回码，返回0表示成功，返回-1表示输入参数解析失败
    replyCode: '-1' | '0';
    // 返回信息，注册成功返回“Success register to listen keyboard event”
    reply: string;
}

interface FacePayParam extends BaseParam<FacePayResult, FacePayResult> {
    // {true,false}是否需要获取支付付款码，填入true,付款码将不会传入收银机，而会通过onFacePayPassEvent直接回传给小程序，用于小程序独立收银。如不填写则为false。
    requireFaceCode: boolean;
}

interface FacePayResult {
    // 0 返回码，返回"0"表示转文字并且播放成功
    // -1 未知错误
    // -2 青蛙小程序内部错误
    // -3 人脸支付已经在运行
    // -4 无网络
    // -5 当前机具不支持此功能
    // -6 超时
    replyCode: '0' | '-1' | '-2' | '-3' | '-4' | '-5' | '-6';
    // 错误具体信息
    reply: string;
}

interface OnFacePayPassEventParam extends BaseParam<OnFacePayPassEventResult, OnFacePayPassEventResult> {

}

interface OnFacePayPassEventResult {
    // 返回码，返回"0"表示成功
    replyCode: '0';
    // 返回信息，成功回调返回"face pay finished"
    reply: string;
    // 返回付款码，当开发者调用wxfaceapp.facePay传入requireFaceCode=true时才会返回
    faceCode: string;
}

interface OnFacePayFailedEventParam extends BaseParam<OnFacePayFailedEventResult, OnFacePayFailedEventResult> {

}

interface OnFacePayFailedEventResult {
    // 返回码，返回"0"表示成功
    // -1 未知错误
    // -6 超时
    // -7 用户取消支付
    // -8 用户刷脸多次失败，转二维码支付
    replyCode: '-1' | '-6' | '-7' | '-8';
    // 错误信息
    reply: string;
}

interface OnQueryPaymentSucEventParam extends BaseParam<OnQueryPaymentSucEventResult, OnQueryPaymentSucEventResult> {

}

interface OnQueryPaymentSucEventResult {
    // 返回码，返回"0"表示成功
    replyCode: '0';
    // 返回信息，成功回调返回"query payment success"
    reply: string;
}

interface OnQueryPaymentFailedEventParam extends BaseParam<OnQueryPaymentFailedEventResult, OnQueryPaymentFailedEventResult> {

}

interface OnQueryPaymentFailedEventResult {
    // 返回码，返回"0"表示成功
    // -1 未知错误
    // -6 超时
    // -10 查单失败
    // -11 用户刷脸多次失败，转二维码支付
    // -12 查单参数有误
    replyCode: '-1' | '-6' | '-10' | '-11' | '-12';
    // 错误信息
    reply: string;
}

interface ListenCodePaymentParam extends BaseParam<ListenCodePaymentResult, ListenCodePaymentResult> {

}

interface ListenCodePaymentResult {

}

interface OnCodePayEventParam extends BaseParam<OnCodePayEventResult, OnCodePayEventResult> {

}

interface OnCodePayEventResult {
    // 返回码，返回"0"表示成功
    replyCode: String;
    // 错误信息
    reply: string;
}

interface QuickPayParam extends BaseParam<QuickPayResult, QuickPayResult> {

}

interface QuickPayResult {
    // 返回码，返回"0"表示启动后屏小程序成功
    // '-1' 后屏小程序正在启动,请勿重复启动
    // '-2' 接收端的小程序Appid不匹配
    // '-3' 字符数超出限制
    replyCode: '0' | '-1' | '-2' | '-3';
    // 返回信息，成功回调返回"suc launching quick pay"
    reply: string;
}

interface AbleToQuickPayParam extends BaseParam<AbleToQuickPayResult, AbleToQuickPayResult> {

}

interface AbleToQuickPayResult {
    // '0' 返回码，返回"0"表示启动后屏小程序成功
    // '-1' 后屏小程序正在启动,请勿重复启动
    // '-2' 接收端的小程序Appid不匹配
    // '-3' 字符数超出限制
    replyCode: '0' | '-1' | '-2' | '-3';
    // 返回信息，成功回调返回"suc launching quick pay"
    reply: string;
}

interface GetLastPayResultParam extends BaseParam<GetLastPayResultResult, GetLastPayResultError> {

}

interface GetLastPayResultResult {
    // '0' 返回码，返回"0"表示启动后屏小程序成功
    replyCode: String;
    // 返回信息，成功回调返回"fetch suc"
    reply: string;
    // 消费金额,单位:分
    totalFee: string;
    // 折扣金额,单位:分
    discountFee: string;
}

interface GetLastPayResultError {
    // '-1' 后屏小程序正在启动,请勿重复启动
    // '-2' 查询不到上一笔支付结果
    replyCode: String;
    // 错误信息
    reply: string;
}

interface FaceLoginParam extends BaseParam<FaceLoginResult, FaceLoginResult> {

}

interface FaceLoginResult {
    // 0 返回码，返回"0"表示转文字并且播放成功
    // -1 未知错误
    // -2 青蛙小程序内部错误
    // -3 人脸支付已经在运行
    // -4 无网络
    // -5 当前机具不支持此功能
    // -6 超时
    replyCode: '0' | '-1' | '-2' | '-3' | '-4' | '-5' | '-6';
    // 错误具体信息
    reply: string;
}

interface OnSpecialCtrlEventParam extends BaseParam<OnSpecialCtrlEventResult, OnSpecialCtrlEventResult> {

}

interface OnSpecialCtrlEventResult {
    // 返回码， {0:传码;1:收款}
    ctrlCode: '0' | '1';
    // 返回信息，传码场景下,返回"传码",收款场景下,返回"收款"
    ctrlMsg: string;
}


declare type WeChatAppletsPromiseTemplateMethod<P = any, S = any, E = any> = (param: P) => Promise<S>;
interface PromiseStandardizationWeChatAppletsSdk {
    checkWxFacePayOsInfo: WeChatAppletsPromiseTemplateMethod<void, CheckWxFacePayOsInfoResult, CheckWxFacePayOsInfoError>;
    writeToSerialPort: WeChatAppletsPromiseTemplateMethod<WriteToSerialPortParam, WriteToSerialPortResult, WriteToSerialPortError>;
    launchMp: WeChatAppletsPromiseTemplateMethod<LaunchMpParam, LaunchMpResult, LaunchMpResult>;

}
declare const WeChatAppletsSdk: PromiseStandardizationWeChatAppletsSdk;

export { WeChatAppletsSdk };
