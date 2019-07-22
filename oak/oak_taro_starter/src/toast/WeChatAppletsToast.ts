import {ShowToastOptions} from "weixin/src/minapp/ui/modal";
// import "weixin/src/minapp/index"


// interface ShowToastOptions extends ShowToastOptions{
//
// }


export const showToast = (options: ShowToastOptions) => {

    const _o = {...options};

    return new Promise(resolve => {
        const {duration} = _o;
        _o.icon = _o.icon || "none";
        wx.showToast(_o);
        setTimeout(() => {
            wx.hideLoading();
            resolve();
        }, duration || 1500);
    });
};