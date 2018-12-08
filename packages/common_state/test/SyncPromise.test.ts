import * as log4js from "log4js";

const logger = log4js.getLogger();
logger.level = 'debug';

//测试同步等待的promise

class SyncPromiseTest {

    private waitQueue = [];

    private syncHelper: SyncTestHelper = new SyncTestHelper();

    private ok: boolean = false;

    private waitePromise = null;

    // private waitePromiseCache: Map<any, Promise<any>> = new Map<String, Promise<any>>();


    private waiteQueue: any[] = [];

    /**
     * 用于锁定的promise
     */
    private lockPromise: Promise<any> = null;

    handle = (data) => {


        return this.getStatus().then(() => {
            return Promise.resolve(data);
        }).catch(() => {
            logger.debug("lock");
            if (this.lockPromise == null) {
                logger.debug("create lock");
                //lock
                this.lockPromise = this.finally(data);
            }

            //使用一个等待的Promise队列，如果第一个Promise执行成功了则队列的中所有Promise都置为成功,否则下一个promise开始执行
            const promise = new Promise<any>((resolve, reject) => {
                const time = new Date().getTime();
                // logger.debug("promise开始", time, data);
                //等待第一个Promise结束
                this.lockPromise.then((val) => {
                    // logger.debug("第一个promise执行结束", val);
                    // const endTime = new Date().getTime();
                    // logger.debug("promise结束", endTime, data);
                    // logger.debug("耗时", (endTime - time) / 1000, data);
                    resolve(val + data);
                    this.waiteQueue.splice(this.waitQueue.findIndex((item) => item === data), 1);
                    if (this.waiteQueue.length === 0) {
                        logger.debug("所有的等待队列均已经结束");
                        this.lockPromise = null;
                    }
                }).catch((e) => {
                    //第一个promise执行失败，重试
                    logger.debug("--重试-->", e);
                    this.lockPromise = this.finally(this.waiteQueue[0]);
                });
            });
            this.waiteQueue.push(data);

            return promise;
        });

    };

    private async getStatus() {
        if (this.lockPromise == null) {
            return Promise.reject();
        }
        return Math.random() * 100 % 2 === 0
    };

    private async finally(data) {

        const r = await this.syncHelper.toPromise(data);
        const number = parseInt(Math.random() * 100+"") % 2;
        if (number !== 0) {
            return Promise.reject("处理失败");
        }
        return r;
    }

}

class SyncTestHelper {

    private timeout = [6, 2, 1, 3, 1, 3, 2];

    private count: number = 0;

    toPromise(data): Promise<any> {
        const number = this.timeout[this.count % this.timeout.length];
        logger.debug("toPromise", data);
        this.count++;
        return new Promise((resolve) => {

            setTimeout(() => {
                resolve(data);
            }, number * 1000);
        });

    }
}


describe("Sync Promise test", () => {
    const syncPromiseTest = new SyncPromiseTest();

    test("sync", async () => {
        const time = new Date().getTime();
        logger.debug("开始时间", time);

        syncPromiseTest.handle(100).then((data) => {

            logger.debug("expect 200", data);
        });
        syncPromiseTest.handle(99).then((data) => {
            logger.debug("expect 199", data);
        });
        syncPromiseTest.handle(98).then((data) => {
            logger.debug("expect 198", data);
        });
        syncPromiseTest.handle(97).then((data) => {
            logger.debug("expect 197", data);
        });
        await syncPromiseTest.handle(96).then((data) => {
            logger.debug("expect 196", data);
        });
        await syncPromiseTest.handle(95).then((data) => {
            logger.debug("expect 95", data);
        });
        await syncPromiseTest.handle(94).then((data) => {
            logger.debug("expect 94", data);
        });
        await syncPromiseTest.handle(93).then((data) => {
            logger.debug("expect 93", data);
        });
        let endTime = new Date().getTime();
        logger.debug("结束时间", endTime);
        logger.debug("耗时", (endTime - time) / 1000);

    }, 60 * 1000);

});