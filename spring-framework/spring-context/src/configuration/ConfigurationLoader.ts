import {SpringApplicationConfiguration} from "./SpringApplicationConfiguration";


export interface LoadConfigurationOptions {

    /**
     * 文件目录
     * 默认：项目根目录
     */
    fileDir: string;

    /**
     * 文件名称
     * 默认：@link {DEFAULT_CONFIGURATION_FILE_NAME}
     */
    fileName?: string;

    /**
     * 激活的profile
     * 默认：来自环境变量中的 NODE_ENV
     * 当存在激活的profile时，在配置文件的目录下需要有 application-${profile}.yaml的文件
     */
    profiles?: string[];
}

/**
 * 配置文件加载器
 */
export interface ConfigurationLoader {

    load: () => SpringApplicationConfiguration;
}

//默认的配置文件名称
export const DEFAULT_CONFIGURATION_FILE_NAME = "application.yaml";