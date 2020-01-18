import DateFormatUtils from "fengwuxp-common-utils/lib/date/DateFormatUtils";
import {FeignRequestBaseOptions, SimpleApiSignatureStrategy, UriVariable} from "fengwuxp-typescript-feign";


const md5 = require("blueimp-md5");

/**
 * oak的api签名策略
 */
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

    sign = (fields: string[], data: UriVariable, feignRequestBaseOptions: FeignRequestBaseOptions) => {

        const sign = {};

        //签名处理
        sign['clientId'] = this.clientId;
        const timestamp = new Date().getTime();
        sign['timestamp'] = timestamp.toString();
        sign['channelCode'] = this.channelCode;
        sign['sign'] = apiSign(fields, data, this.clientId, this.clientSecret, this.channelCode, timestamp);


        feignRequestBaseOptions.body = {
            ...feignRequestBaseOptions.body,
            ...sign
        }
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

    //加入clientId 、clientSecret 时间戳参与签名
    value += `clientId=${clientId}&clientSecret=${clientSecret}&timestamp=${timestamp}&channelCode=${channelCode}`;


    //TODO 加密规则
    //1: 按照8位为一个处理块，进行混排
    //1.1 按照8 - index 用这数值用来做异或或者取反（例如前4位做异或，后四位做取反）

    return md5(value);
};
