/**
 * 数据缓存
 * https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html
 */

interface StorageBaseOptions {

    /**
     * 否    接口调用失败的回调函数
     */
    fail?: () => void;
    /**
     * 否    接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => void;
}

/**
 * wx.setStorage
 */
export interface SetStorageOptions extends StorageBaseOptions {

    /**
     * 是    本地缓存中的指定的 key
     */
    key: string;

    /**
     * 需要存储的内容
     */
    data: string | object;

    /**
     * Function    否    接口调用成功的回调函数
     */
    success?: () => void
}

/**
 * wx.getStorage
 */
export interface GetStorageOptions extends StorageBaseOptions {

    /**
     * 本地缓存中的指定的 key
     */
    key: string;

    /**
     * 接口调用成功的回调函数
     */
    success: (data: string) => void
}

/**
 * wx.getStorageInfo
 */
export interface GetStorageInfoOptions extends StorageBaseOptions {
    success: (data: StorageInfo) => void
}

/**
 * wx.removeStorage
 * wx.removeStorageSync
 */
export interface RemoveStorageOptions extends GetStorageOptions {

}

export interface StorageInfo {
    /**
     * 当前storage中所有的key
     */
    keys: string | Array<string>;
    /**
     *    当前占用的空间大小, 单位kb
     */
    currentSize: number;
    /**
     * 限制的空间大小，单位kb
     */
    limitSize: number;
}
