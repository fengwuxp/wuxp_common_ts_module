/**
 * 软键盘处理
 */
export interface WeexKeyboardModule {


    /**
     * 隐藏软件盘
     */
    keyboardHide: () => void;


    /**
     * 是否可见
     */
    isVisible: () => boolean;
}