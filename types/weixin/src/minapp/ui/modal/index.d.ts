/**
 * 交互反馈
 * https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-react.html
 */


interface ModalBaseOptions {

    /**
     * 提示的内容
     */
    title: string;

    /**
     * 否    接口调用失败的回调函数
     */
    fail?: () => void;
    /**
     * 否    接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => void;
}

/**
 * wx.showToast
 */
export interface ShowToastOptions extends ShowLoadingOptions {


    /**
     * 图标，只支持"success"、"loading"
     */
    icon?: "success" | "loading" | "none";

    /**
     * 提示的延迟时间，单位毫秒，默认：1500, 最大为10000
     */
    duration?: number;


}

/**
 * wx.showLoading
 */
export interface ShowLoadingOptions extends ModalBaseOptions {

    /**
     * 是否显示透明蒙层，防止触摸穿透，默认：false
     */
    mask?: boolean;

    /**
     * 接口调用成功的回调函数
     */
    success?: () => void;
}

/**
 * wx.showModal
 */
export interface ShowModalOptions extends ModalBaseOptions {


    /**
     * 提示的内容
     */
    content: string;

    /**
     * 是否显示取消按钮，默认为 true
     */
    showCancel?: boolean;

    /**
     * 取消按钮的文字，默认为"取消"
     */
    cancelText?: string;

    /**
     * 取消按钮的文字颜色，默认为"#000000"
     */
    cancelColor?: string;

    /**
     * 确定按钮的文字，默认为"确定"
     */
    confirmText?: string;

    /**
     * 确定按钮的文字颜色，默认为"#3CC51F"
     */
    confirmColor?: string;

    /**
     * 接口调用成功的回调函数
     * @param {ShowModalResult} res
     */
    success?: (res?: ShowModalResult) => void;
}


export interface ShowModalResult {

    /**
     * 为 true 时，表示用户点击了确定按钮
     */
    readonly confirm: boolean;

    /**
     * 为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭）
     */
    readonly cancel: boolean
}

/**
 * wx.showActionSheet
 */
export interface ShowActionSheetOptions extends ModalBaseOptions {

    /**
     * 是    按钮的文字数组，数组长度最大为6个
     */
    itemList: Array<string>
    /**
     *按钮的文字颜色，默认为"#000000"
     */
    itemColor?: string

    /**
     * 接口调用成功的回调函数
     * @param {ActionSheetResult} result
     */
    success?: (result: ActionSheetResult) => void;

}

export interface ActionSheetResult {

    /**
     * 用户点击的按钮，从上到下的顺序，从0开始
     */
    readonly tapIndex: number;
}
