import * as log4js from "log4js";
import * as fs from "fs";
import * as path from "path";
import less from "less";
import LessVariableToJsTransformer from "../src/LessVariableToJsTransformer";
import {CssVariableToJsTransformer} from "../src/CssVariableToJsTransformer";
import {toHumpResolverByDash} from "../src/DefaultVariableNameConverter";
import {generateTypescriptFile} from "../src/GenerateTypescriptFile";
// import x from "./theme";

const logger = log4js.getLogger();
logger.level = 'debug';

/**
 * @see https://github.com/atroo/less-to-json-loader
 */
describe("test  css variable to js", () => {


    test("test less variable js parse", () => {


        const stylePath = path.join(__dirname, "./less/theme.less");
        const lessStyles = fs.readFileSync(stylePath, "UTF-8");
        const cssVariableToJsTransformer: CssVariableToJsTransformer = new LessVariableToJsTransformer();

        cssVariableToJsTransformer.transform(lessStyles, stylePath, {
            paths: [
                path.join(__dirname, "./less/")
            ],
            ignoreVariables: ["@hd"]
        }).then((variable) => {
            logger.debug("variable", variable);
            generateTypescriptFile(variable, path.join(__dirname, "./less/theme.ts"));
        }).catch((e) => {
            logger.error(e);
        })

    })

});
