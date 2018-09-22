/**
 * 环境信息判断
 */


const userAgent = (navigator.userAgent || "").toLowerCase();


export const IS_IPAD = (userAgent.match(/ipad/i) || [])[0] === 'ipad';

export const IS_IPHONE = (userAgent.match(/iphone os/i) || [])[0] === 'iphone os';

export const IS_MIDP = (userAgent.match(/midp/i) || [])[0] === 'midp';

export const IS_UC7 = (userAgent.match(/rv:1.2.3.4/i) || [])[0] === 'rv:1.2.3.4';

export const IS_UC = (userAgent.match(/ucweb/i) || [])[0] === 'web';

export const IS_WIN_CE = (userAgent.match(/windows ce/i) || [])[0] === 'windows ce';

export const IS_WIN_MOBILE = (userAgent.match(/windows mobile/i) || [])[0] === 'windows mobile';

export const IS_ANDROID = (userAgent.match(/android/i) || [])[0] === 'android';




//是否为微信
export const IS_WEIXIN = userAgent.toLowerCase().indexOf("micromessenger") >= 0;

//是否为移动端
export const IS_MOBILE = IS_WEIXIN || IS_IPAD || IS_IPHONE || IS_MIDP || IS_UC7 || IS_UC || IS_WIN_CE || IS_WIN_MOBILE || IS_ANDROID;


