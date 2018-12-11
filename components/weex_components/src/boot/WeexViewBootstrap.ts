// @ts-ignore
import WeexOAKBootStarter from "oak_weex_starter/src/bootstartup/WeexOAKBootStarter";

//weex 页面的根组件需要导入改文件

//获取bootStarter
export const weexSimpleBootStarter = new WeexOAKBootStarter();

//初始化
weexSimpleBootStarter.startup();
