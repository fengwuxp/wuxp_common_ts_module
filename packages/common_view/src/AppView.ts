/**
 * 这是一个视图
 */
export interface AppView<T> {


    /**
     * 页面被创建
     */
    onCreate?: () => void;

    /**
     * 首次被启动
     */
    onStart?: () => void;

    /**
     * 重新被启动
     */
    onRestart?: () => void;

    /**
     * 重新进入页面
     */
    onResume?: () => void;

    /**
     *
     */
    onPause?: () => void;

    /**
     * 页面停止
     */
    onStop?: () => void;

    /**
     * 页面被销毁
     */
    onDestroy?: () => void;
}