import {LocalStorage} from "fengwuxp_common_utils/src/storage/LocalStorage";
import {LocalStorageOptions} from "fengwuxp_common_utils/src/storage/LocalStorage";
import TaroJsHolder, {TaroInterfaceHolder} from "../TaroJsHolder";


/**
 * taro的local storage
 */
class TaroLocalStorage implements LocalStorage {

    protected taroHolder: TaroInterfaceHolder;


    constructor() {
        this.taroHolder = TaroJsHolder.getTaroHolder();
    }

    getKeys = (): Promise<string[]> => Promise.reject("not support get keys");

    getStorage = <T = string>(key: string): Promise<T> => this.taroHolder.taro.getStorage({key}).then(({data}) => data as any);

    removeStorage = (key: string | string[]): Promise<string[]> => {
        //单个keys的移除
        const removeByKey = (keyName: string) => this.taroHolder.taro.removeStorage({key: keyName});
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
        return this.taroHolder.taro.setStorage({
            key,
            data
        });
    }

}

export default new TaroLocalStorage();
