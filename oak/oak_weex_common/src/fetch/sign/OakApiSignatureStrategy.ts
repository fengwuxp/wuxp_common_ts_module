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
        sign['timestamp'] = new Date().getTime().toString();
        sign['channelCode'] = this.channelCode;
        sign['sign'] = apiSign(fields, data, this.clientSecret, this.channelCode);

        // logger.debug("--签名结果->", sign);
        return sign;
    };


}


/**
 * ap请求时签名
 * @param fields 需要签名的列
 * @param params 请求参数
 * @param clientSecret
 * @param channelCode
 * @return {string}
 */
const apiSign = (fields: Array<string>, params: any, clientSecret: string, channelCode: string): string => {
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
    value += `clientId=${params.clientId}&clientSecret=${clientSecret}&timestamp=${params.timestamp}&channelCode=${channelCode}`;

    return md5(value);
};