import YamlConfigurationLoader from "typescript-spring-context/src/configuration/YamlConfigurationLoader";
import {ConfigurationLoader} from "typescript-spring-context/src/configuration/ConfigurationLoader";
import * as path from "path";
import {LOGGER} from "typescript-spring-scannner/src/helper/Log4jsHelper";
import {NODE_MODULES_DIR} from "typescript-spring-scannner/src/constant/ConstantVar";
import {webpack4ReactConfigurationGenerator} from "./react/Webpack4ReactConfigurationGenerator";
import {loadYmlConfiguration} from "typescript-spring-scannner/src";


export interface GeneratorWebpackOptions {

    /**
     * default react
     */
    type?: "react" | "vue";

    yamlConfigPath?: string;
}

const DEFAULT_OPTIONS = {
    type: "react"
};

export default function (options: GeneratorWebpackOptions) {


    const {type, yamlConfigPath} = {
        ...options,
        ...DEFAULT_OPTIONS
    };

    //计算项目根路径
    // let projectBasePath = path.resolve(__dirname, "../");
    let projectBasePath = path.resolve("./");
    if (projectBasePath.indexOf(NODE_MODULES_DIR) > 0) {
        projectBasePath = path.resolve(projectBasePath, "../");
    }

    LOGGER.debug("project base path", projectBasePath);

    const springApplicationConfiguration = loadYmlConfiguration(yamlConfigPath || projectBasePath);

    const springWebpackConfiguration = springApplicationConfiguration.spring.webpack;

    return webpack4ReactConfigurationGenerator(springWebpackConfiguration);
}