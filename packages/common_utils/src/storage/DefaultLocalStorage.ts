import {LocalStorage, LocalStorageOptions} from "./LocalStorage";


export default abstract class AbstractLocalStorage implements LocalStorage {

    abstract getKeys: () => Promise<string[]>;

    abstract getStorage<T>(key: string): Promise<T> ;

    abstract removeStorage(key: string | string[]): Promise<string[]>

    abstract setStorage<T>(key: string, data: T, options?: LocalStorageOptions): Promise<void>


    /**
     * 数据是否有效
     * @param expireDate
     */
    protected isItEffective = (expireDate: number) => {

        return new Date().getTime() > expireDate;
    }

}