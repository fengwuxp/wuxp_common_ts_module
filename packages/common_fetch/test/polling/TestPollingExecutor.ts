import * as log4js from "log4js";
import {polling} from "../../src/polling/PollingStrategy";

const logger = log4js.getLogger();
logger.level = 'debug';


describe("test polling strategy", () => {


    test("test polling", async () => {


        polling({
            interval: 1000,
            isSerial: true,
            handle: (): Promise<number> => {
                logger.debug("handle");
                return Promise.resolve(Math.random() * 10 + 1);
            }
        }).done((num) => {
            let b = num === 5;
            logger.debug("轮询一次完成", b);
            return !b;
        }).catch((e) => {
            logger.error("轮询异常", e);
            return false;
        }).finally(() => {
            logger.error("轮询完成");
        }).start(200);
    }, 20 * 1000);

});