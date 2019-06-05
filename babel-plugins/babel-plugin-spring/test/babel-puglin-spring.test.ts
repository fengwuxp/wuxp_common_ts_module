import {transformFileSync} from "@babel/core";
import {parse} from "@babel/parser";
import {File, isDecorator, isIdentifier} from "@babel/types";
import traverse from "@babel/traverse";
import template from "@babel/template";

import * as log4js from "log4js";
import BabelPluginSpring from '../src/index';
import * as path from "path";
import * as fs from "fs";

const logger = log4js.getLogger();
logger.level = 'debug';

describe('babel plugin spring', () => {


    // test("", () => {
    //     const filePath = path.join(__dirname, "./example/index.ts");
    //     // logger.debug("filePath = ", filePath);
    //     const sourceCodeText = fs.readFileSync(filePath, "UTF-8");
    //     logger.debug("source code = ", sourceCodeText);
    //
    //     const file: File = parse(sourceCodeText, {
    //         sourceType: "module",
    //         plugins: [
    //             "typescript",
    //             "classProperties",
    //             "decorators-legacy"
    //         ]
    //     });
    // });


    test(`test babel plugin spring`, () => {
        const exampleIndex = path.join(__dirname, "./example/index.ts");
        const exampleResult = transformFileSync(exampleIndex, {
            sourceType: "module",
            presets: ['@babel/preset-typescript'],
            plugins: [
                [
                    "@babel/plugin-proposal-decorators",
                    {
                        legacy: true
                    }
                ],
                BabelPluginSpring

            ],
        }).code;
        logger.debug("exampleResult", exampleResult);
    });

});
