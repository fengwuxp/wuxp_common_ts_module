import {
    BaseParam,
    CheckWxFacePayOsInfoError,
    CheckWxFacePayOsInfoResult,
    LaunchMpResult,
    LaunchMpParam,
    WeChatAppletsTemplateMethod,
    WriteToSerialPortError,
    WriteToSerialPortParam,
    WriteToSerialPortResult,
    PostMsgResult,
    PostMsgParam,
    OnRemoteMessageParam,
    OnRemoteMessageResult,
    RegistKeyBoardResult,
    RegistKeyBoardParam,
    OnKeyBoardEventResult,
    OnKeyBoardEventParam,
    FacePayResult,
    FacePayParam,
    OnFacePayPassEventResult,
    OnFacePayPassEventParam,
    OnFacePayFailedEventResult,
    OnFacePayFailedEventParam,
    OnQueryPaymentSucEventResult,
    OnQueryPaymentSucEventParam,
    OnQueryPaymentFailedEventResult,
    OnQueryPaymentFailedEventParam,
    ListenCodePaymentResult,
    ListenCodePaymentParam,
    OnCodePayEventResult,
    OnCodePayEventParam,
    QuickPayResult,
    QuickPayParam,
    AbleToQuickPayResult,
    AbleToQuickPayParam,
    GetLastPayResultResult,
    GetLastPayResultParam,
    FaceLoginResult, FaceLoginParam, OnSpecialCtrlEventResult, OnSpecialCtrlEventParam
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
        const launchMp: WeChatAppletsTemplateMethod<LaunchMpResult, LaunchMpResult, LaunchMpParam>;


        /**
         * @link https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_3-4-%E9%80%80%E5%87%BA%E5%B0%8F%E7%A8%8B%E5%BA%8F-exitmp
         *  退出小程序 - exitMp
         */
        const exitMp: WeChatAppletsTemplateMethod<void, void, BaseParam<void, void>>;

        /**
         * https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_3-5-小程序间消息发送-postmsg
         *  退出小程序 - exitMp
         */
        const postMsg: WeChatAppletsTemplateMethod<PostMsgResult, PostMsgResult, PostMsgParam>;


        /**
         * https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_3-6-小程序间消息接受-onremotemessage
         *  3.7小程序间消息接受 - onRemoteMessage
         */
        const onRemoteMessage: WeChatAppletsTemplateMethod<OnRemoteMessageResult, OnRemoteMessageResult, OnRemoteMessageParam>;

        /**
         * https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_3-8-注册监听键盘输入-registkeyboard
         *  3.8. 注册监听键盘输入 - registKeyBoard
         */
        const registKeyBoard: WeChatAppletsTemplateMethod<RegistKeyBoardResult, RegistKeyBoardResult, RegistKeyBoardParam>;

        /**
         * https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_3-9-监听键盘输入-onkeyboardevent
         *  3.9. 监听键盘输入 - onKeyBoardEvent
         */
        const onKeyBoardEvent: WeChatAppletsTemplateMethod<OnKeyBoardEventResult, OnKeyBoardEventResult, OnKeyBoardEventParam>;

        /**
         * https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_4-1-启动刷脸支付-facepay
         *  4.1. 启动刷脸支付 - facePay
         */
        const facePay: WeChatAppletsTemplateMethod<FacePayResult, FacePayResult, FacePayParam>;

        /**
         * https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_4-1-启动刷脸支付-facepay
         *  4.1.1. 刷脸成功 - onFacePayPassEvent
         */
        const onFacePayPassEvent: WeChatAppletsTemplateMethod<OnFacePayPassEventResult, OnFacePayPassEventResult, OnFacePayPassEventParam>;

        /**
         * https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_4-1-启动刷脸支付-facepay
         *  4.1.2. 刷脸失败 - onFacePayFailedEvent
         */
        const onFacePayFailedEvent: WeChatAppletsTemplateMethod<OnFacePayFailedEventResult, OnFacePayFailedEventResult, OnFacePayFailedEventParam>;

        /**
         * https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_4-1-启动刷脸支付-facepay
         *  4.1.3. 查单成功 - onQueryPaymentSucEvent
         */
        const onQueryPaymentSucEvent: WeChatAppletsTemplateMethod<OnQueryPaymentSucEventResult, OnQueryPaymentSucEventResult, OnQueryPaymentSucEventParam>;

        /**
         * https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_4-1-启动刷脸支付-facepay
         *  4.1.4. 查单失败 - onQueryPaymentFailedEvent
         */
        const onQueryPaymentFailedEvent: WeChatAppletsTemplateMethod<OnQueryPaymentFailedEventResult, OnQueryPaymentFailedEventResult, OnQueryPaymentFailedEventParam>;

        /**
         * https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_4-2-监听扫码器-listencodepayment
         *  4.2 监听扫码器 - listenCodePayment
         */
        const listenCodePayment: WeChatAppletsTemplateMethod<ListenCodePaymentResult, ListenCodePaymentResult, ListenCodePaymentParam>;

        /**
         * https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_4-2-监听扫码器-listencodepayment
         *  4.2.1 扫码支付事件监听 - onCodePayEvent
         */
        const onCodePayEvent: WeChatAppletsTemplateMethod<OnCodePayEventResult, OnCodePayEventResult, OnCodePayEventParam>;

        /**
         * https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_4-2-监听扫码器-listencodepayment
         *  4.3. 快速支付 - quickPay
         */
        const quickPay: WeChatAppletsTemplateMethod<QuickPayResult, QuickPayResult, QuickPayParam>;

        /**
         * https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_4-4-快速支付是否可用-abletoquickpay
         *  4.4. 快速支付是否可用 - ableToQuickPay
         */
        const ableToQuickPay: WeChatAppletsTemplateMethod<AbleToQuickPayResult, AbleToQuickPayResult, AbleToQuickPayParam>;

        /**
         * https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_4-5-获取上一笔支付记录-getlastpayresult
         *  4.5. 获取上一笔支付记录 - getLastPayResult
         */
        const getLastPayResult: WeChatAppletsTemplateMethod<GetLastPayResultResult, GetLastPayResultResult, GetLastPayResultParam>;

        /**
         * https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_5-2-查看青蛙app此时是否具有登录态-isloginonfaceapp
         *  5.2. 查看青蛙App此时是否具有登录态 - isLoginOnFaceApp
         */
        const isLoginOnFaceApp: WeChatAppletsTemplateMethod<void, void, BaseParam<void, void>>;

        /**
         * https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_5-3-青蛙刷脸登录-wxfaceapp-facelogin
         *  5.3. 青蛙刷脸登录 - wxfaceapp.faceLogin
         */
        const faceLogin: WeChatAppletsTemplateMethod<FaceLoginResult, FaceLoginResult, FaceLoginParam>;

        /**
         * https://pay.weixin.qq.com/wiki/doc/wxfacepay/develop/miniprogram-api.html#_6-1-会员场景特殊指令-onspecialctrlevent
         *  6.1. 会员场景特殊指令 - onSpecialCtrlEvent
         */
        const onSpecialCtrlEvent: WeChatAppletsTemplateMethod<OnSpecialCtrlEventResult, OnSpecialCtrlEventResult, OnSpecialCtrlEventParam>;
    }
}
