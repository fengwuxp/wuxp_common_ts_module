import { transformFileSync } from "@babel/core";
import {parse} from "@babel/parser";
import {readdirSync, readFileSync} from 'fs';
import * as log4js from "log4js";
import BabelPluginSpring from '../src/index';
import * as path from "path";
import * as fs from "fs";

const logger = log4js.getLogger();
logger.level = 'debug';

describe('babel plugin spring', () => {

    test(`test babel plugin spring`, () => {
        const exampleIndex = path.join(__dirname, "./example/index.ts");
        const exampleResult = transformFileSync(exampleIndex, {
            sourceType: "module",
            presets: ['@babel/preset-typescript'],
            plugins: [
                BabelPluginSpring,
                [
                    "@babel/plugin-proposal-decorators",
                    {
                        legacy: true
                    }
                ],
                // "@babel/plugin-proposal-object-rest-spread",
                // [
                //     "@babel/plugin-proposal-class-properties",
                //     {
                //         loose: true
                //     }
                // ],
                // "@babel/plugin-proposal-json-strings",
                // "@babel/plugin-syntax-dynamic-import",
                // "@babel/plugin-syntax-import-meta",
                // "@babel/plugin-transform-async-to-generator",
                // "@babel/plugin-transform-regenerator",
                // [
                //     "@babel/plugin-transform-runtime",
                //     {
                //         // corejs: 2,  //false or 2
                //         helpers: false,
                //         regenerator: true,
                //     }
                // ]

            ],
        }).code;
        logger.debug("exampleResult",exampleResult);
    });

});
