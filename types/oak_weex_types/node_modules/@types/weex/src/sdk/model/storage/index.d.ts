import {WeexModule} from "../../../../index";

/**
 * weex storage
 * https://weex.apache.org/cn/references/modules/storage.html
 */
export interface WeexStorageModule extends WeexModule {

    /**
     * 该方法可以通过键值对的形式将数据存储到本地。同时可以通过该方法，更新已有的数据。
     * @param {string} key
     * @param {string} value
     * @param {(result: WeexStorageResult) => void} callback
     * e.result：表示操作是否成功，如果成功返回 "success"
     * e.data：undefined 表示设置成功，invalid_param 表示 key/value 为 "" 或者 null
     */
    readonly  setItem: (key: string, value: string, callback?: (result: WeexStorageResult) => void) => void;

    /**
     * 传入键名返回对应的键值
     * @param {string} key
     * @param {(result: WeexStorageResult) => void} callback
     * e.result：表示删除是否成功，如果成功返回 "success"
     * e.data：undefined 表示删除成功
     */
    readonly  getItem: (key: string, callback: (result: WeexStorageResult) => void) => void;


    /**
     * 传入一个键名将会删除本地存储中对应的键值
     * @param {string} key
     * @param {(result: WeexStorageResult) => void} callback
     * e.result：表示删除是否成功，如果成功返回 "success"
     * e.data：undefined 表示删除成功
     */
    readonly  removeItem: (key: string, callback?: (result: WeexStorageResult) => void) => void;

    /**
     *返回本地存储的数据中所有存储项数量的整数
     * @param {(result: WeexStorageResult) => void} callback
     * e.result：表示操作是否成功，如果成功返回 "success"
     * e.data：当前已存储项的数量
     */
    readonly  length: (callback: (result: WeexStorageResult) => void) => void;

    /**
     * 返回一个包含全部已存储项键名的数组
     * @param {(result: WeexStorageResult) => void} callback
     * e.result：表示操作是否成功，如果成功返回 "success"
     * e.data：所有键名组成的数组
     */
    readonly getAllKeys: (callback: (result: WeexStorageResult) => void) => void;
}

export interface WeexStorageResult {

    /**
     * 数据
     */
    readonly data: string | number | Array<string>;

    /**
     * 可能为 success 或 fail
     */
    readonly result: string;
}


