import * as log4js from "log4js";

const logger = log4js.getLogger();
logger.level = 'debug';


// https://www.typescriptlang.org/play/index.html?target=99#

describe("promise api test", () => {


    test("test generate", () => {

        function* helloWorldGenerator() {
            yield 'hello';
            yield 'world';
            return 'ending';
        }

        const hw = helloWorldGenerator();
        let next = null;
        while ((next = hw.next()) && !next.done) {
            logger.debug("next", next.value);
        }
    });


});
