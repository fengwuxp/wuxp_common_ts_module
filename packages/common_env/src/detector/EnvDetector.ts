/**
 * 运行环境探测器
 * @author wxup
 * @create 2018-09-29 15:24
 **/
export interface EnvDetector {

    /**
     * 是否android
     */
    isAndroid: boolean;

    /**
     * 是否ios
     */
    isIos: boolean;

    /**
     * 是否web
     */
    isWeb: boolean;
}
