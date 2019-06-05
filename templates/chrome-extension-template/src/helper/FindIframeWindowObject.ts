/**
 * 递归查找iframe
 * @param iframeIds
 * @param parentWindow
 */
export const finDeepIframeWindow = async (iframeIds: string[], parentWindow): Promise<any> => {

    let _win = parentWindow;
    iframeIds.forEach(async (iframeId) => {
        try {
            _win = await animationFrame(iframeId, _win);
        } catch (e) {
            console.error(e);
        }
    });

    return _win;
};

const animationFrame = (iframeId: string, parentWindow) => {

    const caller = (resolve, reject) => {
        setTimeout(() => {
            const iframe = parentWindow[iframeId];
            if (iframe) {
                resolve(iframe);
            } else {
                caller(resolve, reject);
            }
        }, 100);
    };

    return new Promise(caller);
};

