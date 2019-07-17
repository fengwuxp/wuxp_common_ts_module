import {WeexStandardizedModule} from "fengwuxp_common_weex/src/sdk/standardization/WeexStandardizedModule";


/**
 * weex 标准化的视频播放模块
 */
export interface WeexVideoStandardizedModule extends WeexStandardizedModule {


    /**
     * 播放
     * @param url
     */
    play: (url: string) => Promise<number | void>;

    /**
     * 暂停
     */
    pause: () => Promise<void>;


    /**
     * 停止
     */
    stop: () => Promise<void>
}

