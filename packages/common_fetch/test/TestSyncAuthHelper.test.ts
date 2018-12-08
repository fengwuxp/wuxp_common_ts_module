import {SyncAuthHelper} from "../src/interceptor/default/NeedAuthInterceptor";
import {FetchOptions, FetchResponse} from "../src/fetch/FetchOptions";
import * as log4js from "log4js";

const logger = log4js.getLogger();
logger.level = 'debug';

interface Member {

    id: number;

    token: string;
}

class LockExecutor {

    protected lockTask: Promise<Member>;

    execute = (): Promise<Member> => {

        if (this.lockTask == null) {
            this.lockTask = new Promise<Member>((resolve, reject) => {

                //模拟网络请求
                setTimeout(() => {
                    resolve({
                        id: Math.random() * 200,
                        token: Math.random() * 200 + ""
                    })
                }, 3 * 1000)
            });
        }

        return new Promise((resolve, reject) => {
            //等待锁释放
            this.lockTask.then(resolve).catch(reject);
        });
    };

}

class TestSyncAuthHelper implements SyncAuthHelper<Member> {

    protected lockExecutor: LockExecutor;

    protected member: Member = {
        id: 0,
        token: "0"
    };

    isToAuthView: (data: FetchResponse) => Promise<boolean>;

    lockExecute = (): Promise<Member> => {
        return this.lockExecutor.execute();
    };

    async requestParamsEnhance(params: FetchOptions): Promise<boolean> {

        const flag = parseInt(Math.random() * 100 + "") % 2;
        if (this.member.id == flag) {
            if (this.lockExecutor == null) {
                this.lockExecutor = new LockExecutor();
            }
            //锁定执行
            this.member = await this.lockExecute();
            //释放执行器
            this.lockExecutor = null;
        }
        console.log("this.member.id", this.member.id);
        logger.debug("fetch options", params);

        return true;
    };

    unLock: () => Promise<Member>;

}

describe("sync auth helper test", () => {

    const syncAuthHelper: SyncAuthHelper = new TestSyncAuthHelper();

    test("auth test", async () => {

        syncAuthHelper.requestParamsEnhance({
            url: "124"
        } as any);

        syncAuthHelper.requestParamsEnhance({
            url: "234"
        } as any);

        syncAuthHelper.requestParamsEnhance({
            url: "456"
        } as any);

        syncAuthHelper.requestParamsEnhance({
            url: "678"
        } as any);

    }, 20 * 1000)
});