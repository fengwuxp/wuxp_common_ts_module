import DateFormatUtils from "fengwuxp-common-utils/lib/date/DateFormatUtils";
import {FeignRequestBaseOptions, SimpleApiSignatureStrategy, UriVariable} from "fengwuxp-typescript-feign";
import UUIDUtil from "fengwuxp-common-utils/lib/uuid/UUIDUtil"

const md5 = require("blueimp-md5");


const APP_ID_KEY: string = "appId";
const APP_SECRET_KEY: string = "appSecret";
const CHANNEL_CODE_KEY = "channelCode";
const NONCE_STR_KEY: string = "nonceStr";
const TIME_STAMP_KEY: string = "timeStamp";
const API_SIGNATURE_KEY: string = "apiSignature";


const APP_ID_HEADER_KEY = "Api-App-Id";
const NONCE_STR_HEADER_KEY = "Api-Nonce-Str";
const APP_SIGN_HEADER_KEY = "Api-Signature";
const TIME_STAMP_HEADER_KEY = "Api-Time-Stamp";
const CHANNEL_CODE_HEADER_KEY = "Api-Channel-Code";


/**
 * oak的api签名策略
 */
export default class OAKApiSignatureStrategy implements SimpleApiSignatureStrategy {

    /**
     * 客户端id
     */
    private appId: string;

    /**
     * 签名秘钥
     */
    private appSecret: string;

    /**
     * 渠道编号
     */
    private channelCode: string;

    /**
     * 支持使用body上传签名数据
     */
    private supportBody: boolean;


    constructor(appId: string, appSecret: string, channelCode: string, supportBody?: boolean) {
        this.appId = appId;
        this.appSecret = appSecret;
        this.channelCode = channelCode;
        this.supportBody = supportBody || true;
    }

    sign = (fields: string[], data: UriVariable, feignRequestBaseOptions: FeignRequestBaseOptions) => {

        const {appId, appSecret, channelCode} = this;
        const noneStr = UUIDUtil.guid();
        const timestamp = new Date().getTime();
        const headers = feignRequestBaseOptions.headers;
        const appSignature = apiSign(fields, data, appId, appSecret, channelCode, timestamp, noneStr);

        //加入请求头
        const newHeaders = {
            [APP_ID_HEADER_KEY]: this.appId,
            [NONCE_STR_HEADER_KEY]: noneStr,
            [TIME_STAMP_HEADER_KEY]: timestamp.toString(),
            [APP_SIGN_HEADER_KEY]: appSignature,
            [CHANNEL_CODE_HEADER_KEY]: channelCode
        };
        feignRequestBaseOptions.headers = {
            ...headers,
            ...newHeaders
        };
        //签名处理
        if (feignRequestBaseOptions.body != null && this.supportBody) {
            const sign = {};
            sign[APP_ID_KEY] = this.appId;
            sign[TIME_STAMP_KEY] = timestamp.toString();
            sign[NONCE_STR_KEY] = noneStr;
            sign[API_SIGNATURE_KEY] = appSignature;
            sign[CHANNEL_CODE_KEY] = channelCode;
            feignRequestBaseOptions.body = {
                ...feignRequestBaseOptions.body,
                ...sign
            }
        }


    };


}


/**
 * ap请求时签名
 * @param fields             需要签名的列
 * @param params             请求参数
 * @param appId              接入客户端ID
 * @param appSecret          接入客户端秘钥
 * @param channelCode        接入客户端代码
 * @param timestamp          请求时间戳
 * @param noneStr            noneStr
 * @return {string}          返回内容
 */
const apiSign = (fields: Array<string>,
                 params: any,
                 appId: string,
                 appSecret: string,
                 channelCode: string,
                 timestamp: number,
                 noneStr: string): string => {
    console.log("需要签名的列->", fields);
    let value = "";
    if (fields != null) {
        fields.sort().forEach((item) => {
            const key = item.toString();
            let param = params[key];
            if (param == null) {
                throw new Error("参与签名的参数：" + key + " 未传入或值无效!");
            }

            if (param.constructor === Date) {
                //时间类型字段转为yyyy-MM-dd hh:mm:ss在签名
                param = DateFormatUtils.formatterDate(param);
            }

            value += `${item}=${param}&`;
        });
    }

    //加入appId 、appSecret 时间戳参与签名
    value += [
        `${APP_ID_KEY}=${appId}`,
        `${APP_SECRET_KEY}=${appSecret}`,
        `${CHANNEL_CODE_KEY}=${channelCode}`,
        `${NONCE_STR_KEY}=${noneStr}`,
        `${TIME_STAMP_KEY}=${timestamp}`
    ].join("&");


    //TODO 加密规则
    //1: 按照8位为一个处理块，进行混排
    //1.1 按照8 - index 用这数值用来做异或或者取反（例如前4位做异或，后四位做取反）

    return md5(value);
};
