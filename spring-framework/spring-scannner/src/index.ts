import jsYaml from "js-yaml";
import * as fs from "fs";

/**
 * 默认 在项目根路径下 application-spring.yaml
 * @param yamlConfigPath
 */
export default function (yamlConfigPath?: string) {

    jsYaml.safeLoad(yamlConfigPath)
}