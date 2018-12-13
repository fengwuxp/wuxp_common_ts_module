import {WeexStorageModule, WeexStorageResult} from "weex/src/sdk/model/storage";
import {LocalStorage} from "common_utils/src/storage/LocalStorage";


/**
 * 抽象的实现 weex local storage实现
 */
export default abstract class AbstractWeexLocalStorage implements LocalStorage {


    protected weexStorage: WeexStorageModule;


    constructor(weexStorage: WeexStorageModule) {
        this.weexStorage = weexStorage;
    }

    getKeys = (): Promise<string[]> => new Promise<string[]>((resolve, reject) => {
        this.weexStorage.getAllKeys((result) => {
            this.handleResult(result, resolve, reject);
        });
    });

    getStorage = <T = string>(key: string): Promise<T> => new Promise<T>((resolve, reject) => {
        this.weexStorage.getItem(key, (result) => {
            this.handleResult(result, resolve, reject);
        });
    });

    removeStorage(key: string | string[]): Promise<string[]> {

        //单个keys的移除
        const removeByKey = (keyName) => new Promise<string>((resolve, reject) => {
            this.weexStorage.removeItem(keyName, (result) => {
                this.handleResult(result, resolve, reject);
            });
        });

        let keys: string[];
        if (Array.isArray(key)) {
            keys = [...key];
        } else {
            keys = [key];
        }
        return Promise.all(keys.map(removeByKey));

    }

    setStorage = <T>(key: string, data: T): Promise<void> => new Promise((resolve, reject) => {
        this.weexStorage.removeItem(key, (result) => {
            this.handleResult(result, resolve, reject);
        });
    });

    /**
     * 处理结果
     * @param data
     * @param result
     * @param resolve
     * @param reject
     */
    protected handleResult = ({data, result}: WeexStorageResult, resolve, reject) => {
        if (this.isSuccess(result)) {
            resolve(data);
        } else {
            reject(result);
        }
    };

    protected abstract isSuccess: (result: string) => boolean;


}