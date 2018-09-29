import {EnvDetector} from "../EnvDetector";


const userAgent = (navigator.userAgent || "").toLowerCase();


const IS_IPAD = (userAgent.match(/ipad/i) || [])[0] === 'ipad';

const IS_IPHONE = (userAgent.match(/iphone os/i) || [])[0] === 'iphone os';

const IS_MIDP = (userAgent.match(/midp/i) || [])[0] === 'midp';

const IS_UC7 = (userAgent.match(/rv:1.2.3.4/i) || [])[0] === 'rv:1.2.3.4';

const IS_UC = (userAgent.match(/ucweb/i) || [])[0] === 'web';

const IS_WIN_CE = (userAgent.match(/windows ce/i) || [])[0] === 'windows ce';

const IS_WIN_MOBILE = (userAgent.match(/windows mobile/i) || [])[0] === 'windows mobile';

const IS_ANDROID = (userAgent.match(/android/i) || [])[0] === 'android';


//是否为微信
const IS_WEIXIN = userAgent.toLowerCase().indexOf("micromessenger") >= 0;

//是否为移动端
const IS_MOBILE = IS_WEIXIN || IS_IPAD || IS_IPHONE || IS_MIDP || IS_UC7 || IS_UC || IS_WIN_CE || IS_WIN_MOBILE || IS_ANDROID;

/**
 * web 环境探测器
 * @author wxup
 * @create 2018-09-29 15:32
 **/
export interface WebEnvDetector extends EnvDetector {

    /**
     * 是否为移动端
     */
    isMobile: boolean;

    /**
     * 是否winPhone
     */
    isWinPhone: boolean;

    /**
     * 是否为微信浏览器
     */
    isWeChat: boolean;

}

const webEnvDetector: WebEnvDetector = {
    isWeb: true,
    isAndroid: IS_ANDROID,
    isIos: IS_IPHONE,
    isMobile: IS_MOBILE,
    isWinPhone: IS_WIN_MOBILE,
    isWeChat: IS_WEIXIN
};

export default webEnvDetector;
