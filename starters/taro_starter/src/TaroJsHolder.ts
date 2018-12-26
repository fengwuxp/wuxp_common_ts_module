import * as Taro from "@tarojs/taro";


export type TaroInterface = typeof Taro;

/**
 * taro实例的持有者
 * 要在应用程序路入口初始化
 */
export default class TaroJsHolder {

    public static TARO: TaroInterface;

}