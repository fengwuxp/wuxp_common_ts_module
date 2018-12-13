
import * as Taro from "@tarojs/taro";
import StringUtils from "common_utils/src/string/StringUtils";

/**
 * app session 管理
 */
export interface AppSessionManager<T> {

    getMember: () => Promise<T>;

    isLogin: () => Promise<boolean>;

    saveMember: (memebr: T) => Promise<void>;

    removeMember: () => Promise<boolean>;
}

export default abstract class AbstractAppSessionManager<T> implements AppSessionManager<T> {

    static SESSION_KEY = "OAK_SESSION_KEY";

    private member: T;

    getMember = (): Promise<T> => {

        if (this.member != null) {
            return Promise.resolve(this.member);
        }

        return Taro.getStorage({
            key: AbstractAppSessionManager.SESSION_KEY
        }).then(({data}) => {
            if (!StringUtils.hasText(data)) {
                return null;
            }
            return JSON.parse(data) as T;
        });

    };

    isLogin: () => Promise<boolean>;

    removeMember: () => Promise<boolean>;

    saveMember: (memebr: T) => Promise<void>;


}