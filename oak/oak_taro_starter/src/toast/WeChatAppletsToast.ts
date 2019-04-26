import {ShowToastOptions} from "weixin/src/minapp/ui/modal";
// import "weixin/src/minapp/index"


// interface ShowToastOptions extends ShowToastOptions{
//
// }

export  const showToast = (options: ShowToastOptions) => {

    return new Promise(resolve => {
        const {duration} = options;
        wx.showToast(options);
        setTimeout(() => {
            wx.hideLoading();
            resolve();
        }, duration || 1500);
    });
};