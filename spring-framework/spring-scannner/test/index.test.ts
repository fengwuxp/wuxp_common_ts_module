import * as log4js from "log4js";
import * as path from "path";
import * as fs from "fs";
import fn from "../src/index";


const logger = log4js.getLogger();
logger.level = 'debug';


describe('spring scanner test', () => {


    test(`test one`, () => {
        fn()

    })
});