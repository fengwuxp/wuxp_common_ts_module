import * as log4js from "log4js";

const logger = log4js.getLogger();
logger.level = 'debug';


// https://www.typescriptlang.org/play/index.html?target=99#

describe("promise api test", () => {


    const sleep = (times: number) => {

        return new Promise((resolve) => {
            setTimeout(resolve, times)
        })
    };

    test("test Promise.prototype.then", () => {

        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1)
            }, 1000)
        }).then((data) => {
            logger.debug("promise then result", data);
        })

    });


    test("test Promise.prototype.catch", () => {

        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject("这个是一个错误")
            }, 1000)
        }).catch((data) => {
            logger.debug("promise cathc result", data);
        })

    });

    test("test Promise.prototype.finally", () => {

        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject("这个是一个错误")
            }, 1000)
        }).catch((error) => {
            logger.debug("promise cathc result", error);
            return "success"
        }).then((data) => {
            logger.debug("-->", data);
        }).finally(() => {
            logger.debug("promise finally");
        })

    });

    test("test Promise.prototype.all", () => {

        // 生成一个Promise对象的数组
        const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
            if (id % 2 == 0) {
                return Promise.reject(id);
            }
            return Promise.resolve(id)
        });

        Promise.all(promises).then(function (result) {
            logger.debug("then", result);
        }).catch(function (reason) {
            logger.debug("catch", reason);
        });

    });


    test("test Promise.prototype.race", () => {

        // 生成一个Promise对象的数组
        const promises = [2, 3, 4].map(function (times) {

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (times % 2 == 0) {
                        reject(`error times ${times}`);
                    } else {
                        resolve(times);
                    }
                }, times * 400)
            })
        });

        Promise.race(promises).then(function (result) {
            logger.debug("then", result);
        }).catch(function (reason) {
            logger.debug("catch", reason);
        });

    });


    test("test Promise.prototype.allSettled", () => {

        // const resolved = Promise.resolve(42);
        // const rejected = Promise.reject(-1);
        //
        // // @ts-ignore
        // const allSettledPromise = Promise.allSettled([resolved, rejected]);
        //
        // allSettledPromise.then(function (results) {
        //    logger.debug(results);
        // });

    });

    test("test Promise.prototype.any", async () => {

        // 生成一个Promise对象的数组
        // const promises = [2, 3, 4].map(function (times) {
        //
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             if (times % 2 == 0) {
        //                 reject(`error times ${times}`);
        //             } else {
        //                 resolve(times);
        //             }
        //         }, times * 400)
        //     })
        // });
        //
        // try {
        //     const first = await Promise.any(promises);
        //    logger.debug(first);
        // } catch (error) {
        //    logger.debug(error);
        // }

    }, 4 * 1000);

    test("test Promise.prototype.resolve", async () => {
        const p = Promise.resolve('Hello');

        p.then(function (s) {
            logger.debug(s)
        });


        // 需要注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。
        setTimeout(() => {
            logger.debug('three');
        }, 0);

        Promise.resolve().then(function () {
            logger.debug('two');
        });

        logger.debug('one');
        await sleep(100)
    }, 1 * 1000);

    test("test Promise.prototype.reject", async () => {
        const p = Promise.reject('error');

        p.catch((e) => {
            logger.debug(e)
        });


        // 需要注意的是，立即reject()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。
        setTimeout(function () {
            logger.debug('three');
        }, 0);

        Promise.reject().catch(function () {
            logger.debug('two');
        });

        logger.debug('one');
        await sleep(100)
    }, 1 * 1000);

    test("test Promise.try", () => {

        //实际开发中，经常遇到一种情况：不知道或者不想区分，函数f是同步函数还是异步操作，但是想用 Promise 来处理它。
        // 因为这样就可以不管f是否包含异步操作，都用then方法指定下一步流程

        // https://es6.ruanyifeng.com/#docs/promise#Promise-try

        // Promise.try  尝试以Promise的方式运行传入的函数，如果方法是同步的，就以同步的方式执行，并以Promise的方式返回，如果是异步的（本身就是Promise），就原样执行

        // 等价写法
        // (async () => f())()
        // .then(...)

        // Promise.try(() => 1)
        //     .then((data) => {
        //         logger.debug("--->", data)
        //         return Promise.reject("error")
        //     })
        //     .catch((error) => {
        //         logger.debug("--->", error)
        //     })
    })

});
