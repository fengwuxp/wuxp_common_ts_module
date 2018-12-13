import {LocalStorage} from "common_utils/src/storage/LocalStorage";
import {LocalStorageOptions} from "common_utils/src/storage/LocalStorage";
import * as Taro from "@tarojs/taro";


class TaroLocalStorage implements LocalStorage {


    getKeys = (): Promise<string[]> => Promise.reject("not support get keys");

    getStorage = <T = string>(key: string): Promise<T> => Taro.getStorage({key}).then(({data}) => data as any);

    removeStorage = (key: string | string[]): Promise<string[]> => {
        //单个keys的移除
        const removeByKey = (keyName: string) => Taro.removeStorage({key: keyName});
        let keys: string[];
        if (Array.isArray(key)) {
            keys = [...key];
        } else {
            keys = [key];
        }
        return Promise.all(keys.map(removeByKey));
    };

    setStorage = <T>(key: string, data: T, options?: LocalStorageOptions): Promise<void> => {
        // let d: string;
        // if (typeof data != "string") {
        //     d = JSON.stringify(data);
        // } else {
        //     d = data;
        // }
        return Taro.setStorage({
            key,
            data
        });
    }

}

export default new TaroLocalStorage();