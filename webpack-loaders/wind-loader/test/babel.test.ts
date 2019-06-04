import * as log4js from "log4js";
import {parse} from "@babel/parser";
import {
    File,
    Node,
    ClassBody,
    Decorator,
    isDecorator,
    isIdentifier,
    isImportSpecifier,
    isImportDeclaration,
    isCallExpression,
    isClassDeclaration
} from "@babel/types";
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
                const node: Node = path.node;

                if (isImportDeclaration(node)) {

                    logger.debug(node);
                }

                if (isClassDeclaration(node)) {
                    // logger.debug("class node = ", node);

                    const decorators: Array<Decorator> = node.decorators;
                    const body: ClassBody = node.body;
                    const typeParameters = node.typeParameters;
                    const superClass = node.superClass;
                    const superTypeParameters = node.superTypeParameters;
                    const type = node.type;

                }


            }
        });

    })
});