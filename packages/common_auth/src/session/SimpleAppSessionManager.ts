import {AppSessionManager} from "./AppSessionManager";
import {LocalStorage} from "common_utils/src/storage/LocalStorage";


/**
 * 默认提供的简单的用户会话管理器
 * 依赖localStorage
 */
export default class SimpleAppSessionManager implements AppSessionManager<any> {

    public static SAVE_MEMBER_KEY: string = `${process.env.API_ROOT_PATH || ''}_APP_MEMBER_INFO`;

    private member: any = null;

    private storage: LocalStorage;


    constructor(storage: LocalStorage) {
        this.storage = storage;
    }

    getMember = <T = any>(): Promise<T> => {

        if (this.member != null) {
            return Promise.resolve(this.member);
        }

        return this.storage.getStorage<T>(SimpleAppSessionManager.SAVE_MEMBER_KEY)
            .then((data) => {
                this.member = data;
                return data;
            });
    };

    isLogin = (): Promise<boolean> => {
        if (this.member != null) {
            return Promise.resolve(true)
        }
        return this.getMember().then((data) => true)
            .catch(() => false);
    };

    removeMember = (): Promise<boolean> => {
        this.member = null;
        return this.storage.removeStorage(SimpleAppSessionManager.SAVE_MEMBER_KEY).then(() => true);
    };

    saveMember = <T>(memebr: T): Promise<void> => {
        this.member = memebr;
        return this.storage.setStorage(SimpleAppSessionManager.SAVE_MEMBER_KEY, memebr);
    };
}
