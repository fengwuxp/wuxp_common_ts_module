import {SimpleApiSignatureStrategy} from "common_fetch/src/signature/ApiSignatureStrategy";

const md5 = require("md5");


export default class OAKApiSignatureStrategy implements SimpleApiSignatureStrategy {

    /**
     * 客户端id
     */
    private clientId: string;

    /**
     * 签名秘钥
     */
    private clientSecret: string;


    /**
     * 渠道编号
     */
    private channelCode: string;


    constructor(clientId: string, clientSecret: string, channelCode: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.channelCode = channelCode;
    }

    sign = (fields: string[], data: (object | any)) => {

        const sign = {};

        //签名处理
        sign['clientId'] = this.clientId;
        const timestamp = new Date().getTime();
        sign['timestamp'] = timestamp.toString();
        sign['channelCode'] = this.channelCode;
        sign['sign'] = apiSign(fields, data, this.clientId, this.clientSecret, this.channelCode, timestamp);

        // logger.debug("--签名结果->", sign);
        return sign;
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
 * @return {string}          返回内容
 */
const apiSign = (fields: Array<string>, params: any, clientId: string, clientSecret: string, channelCode: string, timestamp: number): string => {
    console.log("需要签名的列->", fields);

    let value = "";
    if (fields != null) {
        fields.sort().forEach(function (item) {
            let param = params[item.toString()];
            if (param == null) {
                throw new Error("参与签名的参数：" + item + " 未传入或值无效!");
            }
            value += `${item}=${param}&`;
        });
    }

    //加入clientId 、clientSecret 时间戳参与签名
    value += `clientId=${clientId}&clientSecret=${clientSecret}&timestamp=${timestamp}&channelCode=${channelCode}`;

    return md5(value);
};