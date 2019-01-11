import WeexApplicationBootstrap from "weex_starter/src/bootstartup/WeexApplicationBootstrap";
import OAKInitAppRouterBootStarter from "oak_weex_starter/src/bootstartup/OAKInitAppRouterBootStarter";
import OAKInitFeignBootStarter from "oak_weex_starter/src/bootstartup/OAKInitFeignBootStarter";

//默认的启动器列表
const defaultStarters = [new OAKInitFeignBootStarter(), new OAKInitAppRouterBootStarter()];

export const applicationBootstrap = new WeexApplicationBootstrap(defaultStarters);

//默认先启动一次
applicationBootstrap.startup();