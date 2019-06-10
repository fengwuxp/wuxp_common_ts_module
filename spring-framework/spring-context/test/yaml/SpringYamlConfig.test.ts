import * as log4js from "log4js";
import * as path from "path";
import * as fs from "fs";
import merge from "lodash/merge";
import * as jsYaml from "js-yaml";
import YamlConfigurationLoader from "../../src/configuration/YamlConfigurationLoader";
import {ConfigurationLoader} from "../../src/configuration/ConfigurationLoader";

const logger = log4js.getLogger();
logger.level = 'debug';

describe('spring yaml test', () => {

    const regExp = /(\w+)-(\w*:)/g;

    test("regExp test", () => {

        const text = "  spring:\n" +
            " # profiles:\n" +
            "    ### 从环境变量中读取，默认 development\n" +
            " #  active:\n" +
            "  scanner:\n" +
            "    node-modules:\n" +
            "      - test-model-1\n" +
            "    scan-packages:\n" +
            "      - views\n" +
            "      - pages\n" +
            " ";

        const s = text.replace(regExp, ($1, $2, $3, $4) => {

            const s = `${$2}${$3.replace(/\\s[a-z]/g, function ($1) {
                return $1.toLocaleUpperCase()
            })
                .replace(/^[a-z]/, function ($1) {
                    return $1.toLocaleUpperCase()
                })}`;
            return s;
        });
        logger.debug(s);

    });

    test(`test load yaml`, () => {


        const convertString=(input:string)=>{
            return  input.replace(regExp, ($1, $2, $3, $4) => {

                return `${$2}${$3.replace(/\\s[a-z]/g, function ($1) {
                    return $1.toLocaleUpperCase()
                }).replace(/^[a-z]/, function ($1) {
                    return $1.toLocaleUpperCase()
                })}`;

            });
        }

        const baseConfig = jsYaml.safeLoad(convertString(fs.readFileSync(path.join(__dirname, "../application-spring.yaml"), "UTF-8")), {
            json: true,
            legacy: true,
        });

        logger.debug("baseConfig", baseConfig);

        const devConfig = jsYaml.safeLoad(convertString(fs.readFileSync(path.join(__dirname, "../application-spring-development.yaml"), "UTF-8")), {
            json: true,
            legacy: true,
        });


        logger.debug("devConfig", devConfig);

        const config = merge(baseConfig, devConfig);

        logger.debug("config", config);

    });

    test("yaml config loader test",()=>{

        const configurationLoader:ConfigurationLoader=new YamlConfigurationLoader({
            fileDir:path.join(__dirname,"../"),
            profiles:["production"]
        });
        const springApplicationConfiguration = configurationLoader.load();
        logger.debug("application",springApplicationConfiguration.application.contextPath);
        logger.debug("feign",springApplicationConfiguration.feign.apiModules);
        logger.debug("scanner",springApplicationConfiguration.scanner.scanPackages);

    })

});