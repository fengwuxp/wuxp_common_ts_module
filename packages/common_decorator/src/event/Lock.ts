/**
 * 方法事件的锁处理
 * @author wxup
 * @create 2018-09-06 13:12
 **/


/**
 * 将方法标记为同步等待，在方法为完成之后times毫秒才能够被再次调用
 * @param times 毫秒数
 */
export function syncWait(times: number = 0) {

}

/**
 * 定时锁定某个方法，在times毫秒后才能被再次调用
 * @param times 毫秒数
 */
export function timeLock(times: number) {

}

/**
 * 当方法调用的结果满足条件condition时，这个方法无法被再次调用
 * @param condition
 */
export function once(condition) {

}
