import DateFormatUtils from "fengwuxp-common-utils/lib/date/DateFormatUtils";
import {FeignRequestBaseOptions, SimpleApiSignatureStrategy, UriVariable} from "fengwuxp-typescript-feign";
import UUIDUtil from "fengwuxp-common-utils/lib/uuid/UUIDUtil"

const md5 = require("blueimp-md5");


const APP_ID_KEY: string = "appId";
const APP_SECRET_KEY: string = "appSecret";
const NONCE_STR_KEY: string = "nonceStr";
const TIME_STAMP: string = "timeStamp";
// const API_SIGNATURE: string = "apiSignature";


const APP_ID_HEADER_KEY = "Api-App-Id";
const NONCE_STR_HEADER_KEY = "Api-nonce-str";
const APP_SIGN_HEADER_KEY = "Api-Signature";
const TIME_STAMP_HEADER_KEY = "Api-Time-Stamp";


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


    constructor(appId: string, appSecret: string, channelCode: string) {
        this.appId = appId;
        this.appSecret = appSecret;
        this.channelCode = channelCode;
    }

    sign = (fields: string[], data: UriVariable, feignRequestBaseOptions: FeignRequestBaseOptions) => {


        const noneStr = UUIDUtil.guid();
        const timestamp = new Date().getTime();
        const headers = feignRequestBaseOptions.headers;
        const newHeaders = {
            [APP_ID_HEADER_KEY]: this.appId,
            [NONCE_STR_HEADER_KEY]: noneStr,
            [TIME_STAMP_HEADER_KEY]: timestamp.toString(),
            [APP_SIGN_HEADER_KEY]: apiSign(fields, data, this.appId, this.appSecret, this.channelCode, timestamp, noneStr)
        };
        feignRequestBaseOptions.headers = {
            ...headers,
            ...newHeaders
        }

        //签名处理
        // const sign = {};
        // sign[APP_ID_KEY] = this.clientId;
        // sign[TIME_STAMP] = timestamp.toString();
        // sign[NONCE_STR_KEY] = noneStr;
        // sign[API_SIGNATURE] = apiSign(fields, data, this.clientId, this.clientSecret, this.channelCode, timestamp, noneStr);
        // if (feignRequestBaseOptions.body == null) {
        //
        // }else {
        //     feignRequestBaseOptions.body = {
        //         ...feignRequestBaseOptions.body,
        //         ...sign
        //     }
        // }


    };


}


/**
 * ap请求时签名
 * @param fields             需要签名的列
 * @param params             请求参数
 * @param clientId           接入客户端ID
 * @param clientSecret       接入客户端秘钥
 * @param channelCode        接入客户端代码
 * @param timestamp          请求时间戳
 * @param noneStr            noneStr
 * @return {string}          返回内容
 */
const apiSign = (fields: Array<string>,
                 params: any,
                 clientId: string,
                 clientSecret: string,
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

    value += `${APP_ID_KEY}=${clientId}&${APP_SECRET_KEY}=${clientSecret}&${NONCE_STR_KEY}=${noneStr}&${TIME_STAMP}=${timestamp}`;


    //TODO 加密规则
    //1: 按照8位为一个处理块，进行混排
    //1.1 按照8 - index 用这数值用来做异或或者取反（例如前4位做异或，后四位做取反）

    return md5(value);
};
