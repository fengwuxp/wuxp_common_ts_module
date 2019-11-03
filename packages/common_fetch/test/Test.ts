
import * as log4js from "log4js";
import {A,A1} from "./Test_1";





const logger = log4js.getLogger();
logger.level = 'debug';




describe("function test", () => {


    //


    test("test", () => {
        let a1 = new A();
// a1.a;
        let a2 = new A1();
// a2.a
        logger.debug(a1["a"]);
        logger.debug(a2["a"]);

    })
});
