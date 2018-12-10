import {AppBootStarter} from "common_starter/src/bootstartup/AppBootStarter";
import {WeexAppContext} from "./AbstractBootStarter";

/**
 * weex boot loader
 */
export interface WeexBootStarterLoader {

    /**
     * 加载
     */
    load: () => AppBootStarter<WeexAppContext>;
}

export default class DefaultWeexStarterLoader implements WeexBootStarterLoader {
    /**
     * 设置一个weex boot class
     */
    public static BOOT_STATER_CLAZZ: any = null;


    load = (): AppBootStarter<WeexAppContext> => new DefaultWeexStarterLoader.BOOT_STATER_CLAZZ()


}