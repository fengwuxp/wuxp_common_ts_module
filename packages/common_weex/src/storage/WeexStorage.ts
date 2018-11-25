import {WeexStorageModule} from "weex/src/sdk/model/storage";
import StringUtils from "../../../common_utils/src/string/StringUtils";


export interface WeexStorage {

    removeItem: (key: string) => Promise<boolean>;


    getItem<T>(key: string): Promise<T>;

    saveItem: (key: string, data: any) => Promise<void>;
}

//抽象实现
export default class AbstractWeexStorage implements WeexStorage {

    private storage: WeexStorageModule;


    constructor(storage: WeexStorageModule) {
        this.storage = storage;
    }

    removeItem = (key: string): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            this.storage.removeItem(key, (result) => {
                if (result.result === "success") {
                    resolve(true);
                } else {
                    reject();
                }
            });
        });
    };


    saveItem = (key: string, data: any): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            this.storage.setItem(key, JSON.stringify(data || {}), (result) => {
                if (result.result === "success") {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    };

    getItem<T>(key: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.storage.getItem(key, (result) => {
                if (result.result === "success") {
                    const data = result.data as string;
                    if (StringUtils.hasText(data)) {
                        resolve(JSON.parse(data));
                    } else {
                        reject();
                    }
                } else {
                    reject();
                }
            });
        });
    }


}