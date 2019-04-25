/**
 * 视频
 */
export interface NatJsVideoModule {

    /**
     * 播放
     * @param url
     * @param callback
     */
    play: (url: string, callback: () => void) => void;


    /**
     * 暂停
     * @param callback
     */
    pause: (callback: () => void) => void;


    /**
     * 停止
     * @param callback
     */
    stop: (callback: () => void) => void;
}