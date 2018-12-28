/**
 * 数值金额转换 元转分
 */
export function yuanTofen(value: number = 0): string {
    const number = value * 1000 / 10;
    const s: string = parseFloat(number.toString()).toFixed(0); // *1000/10 防止精度损失
    return s;//parseInt(s);
}

/**
 * 数值金额转换 分转元
 */
export function fenToYuan(value: number = 0): string {
    const number = value / 100;
    const s: string = parseFloat(number.toString()).toFixed(2);  //保证2位小数
    return s;//parseFloat(s);
}
