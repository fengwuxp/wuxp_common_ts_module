const md5 = require("blueimp-md5");

/**
 * ap请求时签名
 * @param fields 需要签名的列
 * @param params 请求参数
 * @param clientSecret
 * @param channelCode
 * @return {string}
 */
export const apiSign = (fields: Array<string>, params: any, clientSecret: string, channelCode: string): string => {
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
