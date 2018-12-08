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

    protected member: Member = {
        id: 0,
        token: "0"
    };

    protected count = 0;

    execute = (): Promise<Member> => {

        const flag = parseInt(Math.random() * 100 + "") % 2;
        if (this.member.id === flag) {
            logger.debug("直接返回本地的token", this.member.id);
            return Promise.resolve(this.member);
        }

        //token已经失效
        logger.warn("token 失效，刷新token", this.member.token);

        this.count++;
        if (this.lockTask == null) {
            //异步任务去获取用户的鉴权信息
            this.lockTask = new Promise<Member>((resolve, reject) => {
                logger.info("开始刷新token");
                //模拟网络请求
                setTimeout(() => {
                    resolve({
                        id: Math.random() * 200,
                        token: Math.random() * 200 + ""
                    })
                }, 3 * 1000);
            });
        }

        return new Promise((resolve, reject) => {
            logger.debug("等待异步任务的完成->");
            //等待异步任务的完成
            this.lockTask.then((data) => {
                resolve(data);
                this.count--;
                if (this.count === 0) {
                    this.lockTask = null;
                    logger.debug("clear task")
                }
            }).catch(reject);
        });
    };

}

class TestSyncAuthHelper implements SyncAuthHelper<Member> {

    protected lockExecutor: LockExecutor = new LockExecutor();


    isToAuthView: (data: FetchResponse) => Promise<boolean>;

    lockExecute = (): Promise<Member> => {
        return this.lockExecutor.execute();
    };

    async requestParamsEnhance(params: FetchOptions): Promise<boolean> {

        //获取鉴权信息
        params.data = await this.lockExecute();
        return true;
    };

    unLock: () => Promise<Member>;

}

describe("sync auth helper test", () => {

    const syncAuthHelper: SyncAuthHelper = new TestSyncAuthHelper();

    test("auth test", async () => {
        const time = new Date().getTime();
        logger.debug("开始时间", time);
        let count = 0;
        const options = [
            {
                url: "0"
            },
            {
                url: "1"
            },
            {
                url: "2"
            },
            {
                url: "3"
            },
            {
                url: "4"
            }
        ];

        const complete = (resolve) => {
            count++;
            if (count === options.length) {
                resolve();

                const endTime = new Date().getTime();
                logger.debug("结束时间", endTime);
                logger.debug("耗时", (endTime - time) / 1000);
            }
        };
        return new Promise((resolve, reject) => {


            syncAuthHelper.requestParamsEnhance(options[0] as any).then(() => {
                logger.debug("options[0]", options[0]);
                complete(resolve);
            });

            syncAuthHelper.requestParamsEnhance(options[1] as any).then(() => {
                logger.debug("options[1]", options[1]);
                complete(resolve);
            });

            syncAuthHelper.requestParamsEnhance(options[2] as any).then(() => {
                logger.debug("options[2]", options[2]);
                complete(resolve);
            });

            syncAuthHelper.requestParamsEnhance(options[3] as any).then(() => {
                logger.debug("options[3]", options[3]);
                complete(resolve);
            });

            syncAuthHelper.requestParamsEnhance(options[4] as any).then(() => {
                logger.debug("options[4]", options[4]);
                complete(resolve);
            });

        });



    }, 20 * 1000);
});