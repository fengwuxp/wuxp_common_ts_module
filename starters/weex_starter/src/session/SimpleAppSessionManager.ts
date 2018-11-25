import {AppSessionManager} from "./AppSessionManager";
import DefaultWeexStroe from "common_weex/src/storage/DefaultWeexStroe";


class SimpleAppSessionManager<T> implements AppSessionManager<T> {

    public static SAVE_MEMBER_KEY: string = "APP_MEMBER_INFO";

    private member: T = null;

    getMember = (): Promise<T> => {

        return DefaultWeexStroe.getItem<T>(SimpleAppSessionManager.SAVE_MEMBER_KEY)
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
        return DefaultWeexStroe.removeItem(SimpleAppSessionManager.SAVE_MEMBER_KEY);
    };

    saveMember = (memebr: T): Promise<void> => {

        return DefaultWeexStroe.saveItem(SimpleAppSessionManager.SAVE_MEMBER_KEY, memebr);
    };
}

const simpleAppSessionManager = new SimpleAppSessionManager();

export default simpleAppSessionManager;