import YamlConfigurationLoader from "typescript-spring-context/src/configuration/YamlConfigurationLoader";
import {ConfigurationLoader} from "typescript-spring-context/src/configuration/ConfigurationLoader";
import * as path from "path";
import {NODE_MODULES_DIR} from "./constant/ConstantVar";
import {LOGGER} from "./helper/Log4jsHelper";
import SpringScanner from "./SpringScanner"
import SpringApplicationConfigurationGenerator from "./generator/spring/SpringApplicationConfigurationGenerator";
import * as log4js from "log4js";

const logger = log4js.getLogger("spring scanner");
logger.level = 'debug';

/**
 * 默认 在项目根路径下 application-spring.yaml
 * @param yamlConfigPath
 */
export default function (yamlConfigPath?: string) {

    //计算项目根路径
    let projectBasePath = path.resolve(__dirname, "../");

    if (projectBasePath.indexOf(NODE_MODULES_DIR) > 0) {
        projectBasePath = path.resolve(projectBasePath, "../");
    }
    LOGGER.debug("project base path", projectBasePath);

    const configurationLoader: ConfigurationLoader = new YamlConfigurationLoader({
        fileDir: yamlConfigPath || projectBasePath,
        profiles: (process.env.ACTIVE_PROFILES || [])
    });

    const springApplicationConfiguration = configurationLoader.load();
    if (springApplicationConfiguration == null) {
        logger.error("no load spring config");
        return;
    }

    SpringScanner({
        projectBasePath,
        ...springApplicationConfiguration.spring.scanner
    });

    //生成spring 配置文件
    const codeGenerator: SpringApplicationConfigurationGenerator = new SpringApplicationConfigurationGenerator();
    codeGenerator.generator(springApplicationConfiguration, {
        projectBasePath,
    });

}