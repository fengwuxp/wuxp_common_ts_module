/**
 * app session 管理
 */
export interface AppSessionManager<T> {

    getMember: () => Promise<T>;

    isLogin: () => Promise<boolean>;

    saveMember:(memebr:T)=>Promise<void>;

    removeMember:()=>Promise<boolean>;
}

