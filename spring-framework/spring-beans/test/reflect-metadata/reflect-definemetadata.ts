// 4.1.2 Reflect.defineMetadata ( metadataKey, metadataValue, target, propertyKey )
// https://rbuckton.github.io/reflect-metadata/#reflect.definemetadata

import  "reflect-metadata";
import { assert } from "chai";
import * as log4js from "log4js"
const logger = log4js.getLogger();
logger.level = 'debug';

describe("Reflect.defineMetadata", () => {
    it("InvalidTarget", () => {
        assert.throws(() => Reflect.defineMetadata("key", "value", undefined, undefined), TypeError);
    });

    it("ValidTargetWithoutTargetKey", () => {
        const target = { };
        Reflect.defineMetadata("key", "value", target, undefined);
        const metadata = Reflect.getMetadata("key",target);
        logger.debug(metadata)
        // assert.doesNotThrow(() => Reflect.defineMetadata("key", "value", { }, undefined));
    });

    it("ValidTargetWithTargetKey", () => {
        assert.doesNotThrow(() => Reflect.defineMetadata("key", "value", { }, "name"));
    });
});