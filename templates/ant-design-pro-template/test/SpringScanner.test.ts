import * as log4js from "log4js";
import * as path from "path";
import packageScanner from "fengwuxp-spring-scannner/src/SpringScanner";
import teconfig from "../tsconfig.json";

const logger = log4js.getLogger();
logger.level = 'debug';


describe('antd pro test', () => {


    test(`spring scanner test`, () => {


        packageScanner({
            nodeModules: [
                // "test-model-1"
            ],
            projectBasePath: path.join(__dirname, "../"),
            scanPackages: ["views", "pages"],
            scanBasePath: path.resolve(__dirname, "../src"),
            aliasBasePath: path.resolve(__dirname),
            aliasConfiguration: teconfig.compilerOptions.paths,
        });
    })
});