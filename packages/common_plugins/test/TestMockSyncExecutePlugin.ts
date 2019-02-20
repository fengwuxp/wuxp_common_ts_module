import MockSyncExecutePlugin from "../src/lock/MockSyncExecutePlugin";
import {LockExecutePlugin} from "../src/lock/LockExecutePlugin";
import * as log4js from "log4js";

const logger = log4js.getLogger();
logger.level = 'debug';

describe("test sync execute", () => {

    const LockExecutePlugin: LockExecutePlugin = new MockSyncExecutePlugin();

    test("test mock function",  async () => {

        let fn = LockExecutePlugin.newProxyFunction((val) => {
            logger.debug("val", val);
        });

        fn(1);

        fn(2);


        setTimeout(() => {
            logger.debug("3");
            fn(3);
        }, 200);
        setTimeout(() => {
            logger.debug("4");
            fn(4);
        }, 1200);

    }, 10 * 1000);
});