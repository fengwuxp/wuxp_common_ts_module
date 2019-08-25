import {transformFileSync} from "@babel/core";
import {parse} from "@babel/parser";
import {File, isDecorator, isIdentifier} from "@babel/types";
import traverse from "@babel/traverse";
import template from "@babel/template";

import * as log4js from "log4js";
import * as path from "path";


const logger = log4js.getLogger();
logger.level = 'debug';


describe('babel plugin spring', () => {



    test(`read ast `, () => {

    });

});
