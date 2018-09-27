import AbstractRegistrationBean from "common_core/src/registry/bean/AbstractRegistrationBean";
import {AppConfig} from "./AppConfig";

/**
 * app 配置注册器
 * @author wxup
 * @create 2018-09-27 21:29
 **/
class AppConfigRegistry extends AbstractRegistrationBean<AppConfig> {

}

const appConfigRegistry = new AppConfigRegistry();
export default appConfigRegistry;
