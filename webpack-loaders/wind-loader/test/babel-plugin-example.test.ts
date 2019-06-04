import * as log4js from "log4js";
import {parse} from "@babel/parser";
import {File, isDecorator,isIdentifier} from "@babel/types";
import traverse from "@babel/traverse";
import template from "@babel/template";

import * as fs from "fs";
import * as path from "path";

const logger = log4js.getLogger();
logger.level = 'debug';


describe("babel test", () => {

    test("test babel parse", () => {

        const filePath = path.join(__dirname, "./index.ts");
        // logger.debug("filePath = ", filePath);
        const sourceCodeText = fs.readFileSync(filePath, "UTF-8");
        // logger.debug("source code = ", sourceCodeText);

        const file: File = parse(sourceCodeText, {
            sourceType: "module",
            plugins: [
                "typescript",
                "classProperties",
                "decorators-legacy"
            ]
        });

        traverse(file, {
            enter(path) {
                const node = path.node;
                if (isIdentifier(node, {name: "Component"})) {
                    logger.debug("Component node = ", node);
                }
                if (isDecorator(node)) {
                    logger.debug("Decorator node = ", node);
                }
            }
        });

    })
});