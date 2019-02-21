
import * as log4js from "log4js";
import StringUtils from "../../src/string/StringUtils";

const logger = log4js.getLogger();
logger.level = 'debug';

describe("test string utils", () => {



    test("test string utils isJsonString",  async () => {
        const result = StringUtils.isJSONString("1876917131");
        logger.debug(result);

    }, 10 * 1000);
});