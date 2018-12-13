import {AppSessionManager} from "./AppSessionManager";
import {LocalStorage} from "common_utils/src/storage/LocalStorage";

/**
 * 默认提供的简单的用户会话管理器
 * 依赖localStorage
 */
export default class SimpleAppSessionManager<T> implements AppSessionManager<T> {

    public static SAVE_MEMBER_KEY: string = "APP_MEMBER_INFO";

    private member: T = null;

    private storage: LocalStorage;


    constructor(storage: LocalStorage) {
        this.storage = storage;
    }

    getMember = (): Promise<T> => {

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
        return this.storage.removeStorage(SimpleAppSessionManager.SAVE_MEMBER_KEY).then(() => true);
    };

    saveMember = (memebr: T): Promise<void> => {

        return this.storage.setStorage(SimpleAppSessionManager.SAVE_MEMBER_KEY, memebr);
    };
}
