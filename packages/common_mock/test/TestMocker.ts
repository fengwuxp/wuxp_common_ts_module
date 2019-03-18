import {wrapperObjectToMocker} from "../src/MockerWrapper";
import DefaultFunctionMockRegistrar from "../src/DefaultFunctionMockRegistrar"
import * as log4js from "log4js";

const logger = log4js.getLogger();
logger.level = 'debug';

describe("test mocker", () => {


    const mockTarget = {
        a: () => {
            return 1;
        }
    };

    const mocker = {
        a: () => {
            return 2;
        }
    };
    DefaultFunctionMockRegistrar.register(mockTarget, mocker);


    test("simple mocker", () => {
        process.env.ENABLED_MOCKER_MODE = "true";
        const module = wrapperObjectToMocker(mockTarget);
        const result = module.a();

        logger.debug("mock result", result)

    });
});