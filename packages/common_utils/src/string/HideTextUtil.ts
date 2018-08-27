const HIDE_MOBILE_PHONE_REGEXP: RegExp = /^(\d{3})\d{4}(\d{4})$/;
const HIDE_ID_NUMBER_REGEXP: RegExp = /^(\d{10})\d{4}(\w{4})$/;

/**
 * 隐藏手机号码中间4位数
 * @param {string} mobilePhone
 * @return {string}
 */
const hideMobilePhone = (mobilePhone: string = ""): string => {
    if (mobilePhone.trim().length < 11) {
        return mobilePhone;
    }
    return mobilePhone.replace(HIDE_MOBILE_PHONE_REGEXP, "$1****$2");
};

/**
 * 隐藏身份证号码生日4位数
 * @param {string} idNumber
 * @return {string}
 */
const hideIdNumber = (idNumber: string = ""): string => {
    if (idNumber.trim().length < 18) {
        return idNumber;
    }
    return idNumber.replace(HIDE_ID_NUMBER_REGEXP, "$1****$2");
};

export {
    hideMobilePhone,
    hideIdNumber
}