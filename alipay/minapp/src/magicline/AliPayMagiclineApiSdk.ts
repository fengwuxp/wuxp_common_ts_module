import IHttpRequestSuccessResult = my.IHttpRequestSuccessResult;

const request = (url, options) => {

    return new Promise<IHttpRequestSuccessResult>((resolve, reject) => {
        my.request({
            url,
            method: options.method,
            data: options.data,
            headers: options.headers,
            success: resolve,
            fail: reject
        })
    })
};


const magicLineApiRequest = (url, options) => {
    return request(url, {
        ...options,
        method: "POST"
    }).then(()=>{

    })
};
