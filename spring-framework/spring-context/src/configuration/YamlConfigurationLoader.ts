import {ConfigurationLoader, DEFAULT_CONFIGURATION_FILE_NAME, LoadConfigurationOptions} from "./ConfigurationLoader";
import {SpringApplicationConfiguration} from "./SpringApplicationConfiguration";
import * as path from "path";
import * as fs from "fs";
import * as jsYaml from "js-yaml";
import merge from "lodash/merge";
import StringUtils from "common_utils/src/string/StringUtils"
import * as log4js from "log4js";

const logger = log4js.getLogger("spring config loader");
logger.level = 'info';

/**
 * 加载yaml的配置
 */
export default class YamlConfigurationLoader implements ConfigurationLoader {

    private options: LoadConfigurationOptions;


    constructor(options: LoadConfigurationOptions) {
        this.options = options;
        if (!StringUtils.hasText(this.options.fileName)) {
            this.options.fileName = DEFAULT_CONFIGURATION_FILE_NAME;
        }
    }

    load = (): SpringApplicationConfiguration => {

        const {
            fileDir,
            fileName,
            profiles
        } = this.options;


        return [
            `${fileDir}${fileName}`,
            ...(profiles || []).map((profile) => {

                return `${fileDir}${fileName.replace(".yaml", `-${profile}.yaml`)}`;
            })
        ].map(this.loadConfig)
            .filter(item => item != null)
            .reduce((prev, current) => {
                return merge(prev, current);
            }, {spring: null}).spring;


    };

    private loadConfig = (filepath) => {

        const existsSync = fs.existsSync(filepath);
        if (!existsSync) {
            logger.error("no such file", filepath);
            return null;
        }

        return jsYaml.safeLoad(this.convertString(fs.readFileSync(path.join(filepath), "UTF-8")), {
            json: true,
            legacy: true,
        })
    };

    /**
     * 替换 配置文件的内容
     *   input :  test-attr: 123
     *   output : testAttr: 123
     * @param input
     */
    private convertString = (input: string) => {
        return input.replace(/(\w+)-(\w*:)/g, ($1, $2, $3) => {

            return `${$2}${$3.replace(/\\s[a-z]/g, $1 => $1.toLocaleUpperCase()).replace(/^[a-z]/, $1 => $1.toLocaleUpperCase())}`;
        });
    }


}