/**
 * Locale 用于国际化
 * @author wxup
 * @create 2018-07-28 15:06
 **/

export interface Locale {

    /**
     * 语言
     */
   readonly lang:string;

    /**
     * 国家
     */
    readonly country?:string;
}
